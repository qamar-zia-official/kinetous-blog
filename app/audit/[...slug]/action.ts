"use server";

import { pagespeedonline_v5 } from "@googleapis/pagespeedonline";
import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";

// Highly detailed diagnostic structure to blow clients away with deep technical knowledge
export interface LighthouseOpportunity {
  id: string;
  title: string;
  description: string;
  displayValue?: string;
  score: number;
}

export interface PageSpeedResult {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  fcp: string;
  lcp: string;
  cls: string;
  tbt: string;
  speedIndex: string;
  tti: string; // Time to Interactive
  serverTime: string; // Time to First Byte (TTFB)
  opportunities: LighthouseOpportunity[];
}

export async function fetchPageSpeed(
  url: string,
  strategy: "mobile" | "desktop",
): Promise<PageSpeedResult> {
  const apiKey = process.env.PAGESPEED_API_KEY;
  const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
    url,
  )}&strategy=${strategy}&category=performance&category=accessibility&category=best-practices&category=seo${
    apiKey ? `&key=${apiKey}` : ""
  }`;

  const res = await fetch(endpoint, { cache: "no-store" });
  if (!res.ok) throw new Error(`PageSpeed API error: ${res.status}`);

  const data: pagespeedonline_v5.Schema$PagespeedApiPagespeedResponseV5 =
    await res.json();

  const lh = data.lighthouseResult;
  const cats = lh?.categories;
  const audits = lh?.audits;

  // Extract actionable performance opportunities (score < 0.9 represents a problem area)
  const opportunitiesList: LighthouseOpportunity[] = [];
  const targetAudits = [
    "render-blocking-resources",
    "unused-javascript",
    "unused-css-rules",
    "modern-image-formats",
    "uses-optimized-images",
    "server-response-time",
    "offscreen-images",
    "unminified-javascript",
    "unminified-css",
  ];

  targetAudits.forEach((auditId) => {
    const audit = audits?.[auditId];
    if (audit && audit.score !== null && (audit.score ?? 1) < 0.9) {
      opportunitiesList.push({
        id: auditId,
        title: audit.title ?? "",
        description: audit.description ?? "",
        displayValue: audit.displayValue ?? undefined,
        score: audit.score ?? 0,
      });
    }
  });

  return {
    performance: Math.round((cats?.performance?.score ?? 0) * 100),
    accessibility: Math.round((cats?.accessibility?.score ?? 0) * 100),
    bestPractices: Math.round((cats?.["best-practices"]?.score ?? 0) * 100),
    seo: Math.round((cats?.seo?.score ?? 0) * 100),
    fcp: audits?.["first-contentful-paint"]?.displayValue ?? "N/A",
    lcp: audits?.["largest-contentful-paint"]?.displayValue ?? "N/A",
    cls: audits?.["cumulative-layout-shift"]?.displayValue ?? "N/A",
    tbt: audits?.["total-blocking-time"]?.displayValue ?? "N/A",
    speedIndex: audits?.["speed-index"]?.displayValue ?? "N/A",
    tti: audits?.["interactive"]?.displayValue ?? "N/A",
    serverTime: audits?.["server-response-time"]?.displayValue ?? "N/A",
    opportunities: opportunitiesList,
  };
}

export async function fetchWebsiteCopy(
  url: string,
  retries = 3,
  delayMs = 1500,
): Promise<string> {
  const cleanUrl = url.trim().startsWith("http")
    ? url.trim()
    : `https://${url.trim()}`;
  const targetUrl = `https://r.jina.ai/${cleanUrl}`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s attempt timeout

    try {
      const res = await fetch(targetUrl, {
        headers: {
          Authorization: `Bearer ${process.env.JINA_API_KEY}`,
          "X-Return-Format": "markdown",
        },
        signal: controller.signal,
        cache: "no-store",
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Jina reader error: ${res.status} ${res.statusText}`);
      }

      const text = await res.text();
      return text.slice(0, 12000);
    } catch (error: any) {
      clearTimeout(timeoutId);

      const isTimeout =
        error.name === "AbortError" || error.code === "ETIMEDOUT";
      console.warn(
        `Jina Scraper: Attempt ${attempt} failed. Reason: ${isTimeout ? "Timeout" : error.message}`,
      );

      if (attempt === retries) {
        throw new Error(
          "Failed to scrap website layout copy. Target host blocked request or timed out.",
        );
      }

      await new Promise((resolve) => setTimeout(resolve, delayMs * attempt));
    }
  }

  throw new Error("Unexpected fallthrough in fetch retry loop");
}

export interface AuditInput {
  url: string;
  mobile: PageSpeedResult | null;
  desktop: PageSpeedResult | null;
  copy: string | null;
}

export async function generateAuditSummary(input: AuditInput) {
  const prompt = `You are an elite, highly critical senior SaaS web auditor. Analyze this dataset for "${input.url}" and generate an exceptionally thorough professional web audit report to close a potential client deal. Make sure your tone is highly advisory, professional, and slightly dramatic about issues to emphasize importance.

${
  input.mobile && input.desktop
    ? `
LIGHTHOUSE PERFORMANCE SCORES (Mobile / Desktop):
- Performance: ${input.mobile.performance}/100 | ${input.desktop.performance}/100
- Accessibility: ${input.mobile.accessibility}/100 | ${input.desktop.accessibility}/100
- Best Practices: ${input.mobile.bestPractices}/100 | ${input.desktop.bestPractices}/100
- SEO: ${input.mobile.seo}/100 | ${input.desktop.seo}/100

CORE PERFORMANCE METRICS (Mobile):
- FCP (First Contentful Paint): ${input.mobile.fcp}
- LCP (Largest Contentful Paint): ${input.mobile.lcp}
- CLS (Cumulative Layout Shift): ${input.mobile.cls}
- TBT (Total Blocking Time): ${input.mobile.tbt}
- Speed Index: ${input.mobile.speedIndex}
- Server Response Time (TTFB): ${input.mobile.serverTime}
`
    : "Lighthouse Audit Data: Unavailable"
}

WEBSITE CONTENT & STRUCTURAL COPY (Excerpt):
${input.copy ? input.copy.slice(0, 4500) : "Copy extraction: Unavailable"}

Produce:
1. ### 🚀 Executive Health Assessment
   Write a sharp, high-level evaluation of their performance and strategic digital positioning (3-4 sentences max).

2. ### ⚠️ Critical Blockers & Diagnostic Issues (Top 5 Issues)
   Identify five high-impact, actionable findings (mix performance, speed metrics, content framing, copy readability, or SEO optimization).

3. ### 💡 Tailored Action Plan
   Provide step-by-step developer and marketer-friendly remedies for each of the identified issues.

4. ### ✍️ Brand Messaging & Copy Integrity Analysis
   Review the copy. Does the headline hit immediately? Is the messaging persuasive or confusing? Suggest 2 refined variations of their main headline to increase conversion rate optimization (CRO).

Format as highly pristine, agency-ready Markdown. Provide visually elegant spacing. Do not include boring fluff; go straight to value.`;

  const { text } = await generateText({
    model: groq("openai/gpt-oss-120b"),
    prompt,
  });

  return text;
}

export async function getTechStack(url: string) {
  const res = fetch(
    `https://api.builtwith.com/free1/api.json?KEY=38ce3834-9fa8-42c8-b048-7983cd91b22c&LOOKUP=${url}`,
  ).then((res) => res.json());
  return res;
}
