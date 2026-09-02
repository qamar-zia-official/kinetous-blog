"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useParams } from "next/navigation";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Loader } from "@/components/ai-elements/loader";
import {
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart as HBarChart,
} from "recharts";
import {
  fetchPageSpeed,
  fetchWebsiteCopy,
  generateAuditSummary,
  getTechStack,
  type PageSpeedResult,
} from "./action";
import CopyRenderer from "./copy";
import {
  Monitor,
  Smartphone,
  Globe,
  CheckCircle2,
  XCircle,
  Loader2,
  Clock,
  AlertTriangle,
  TrendingUp,
  FileText,
  Zap,
  Search,
  ShieldCheck,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import SetSections from "@/app/components/navbar/set-sections";

// ─── Chart configs ────────────────────────────────────────────────────────────
const comparisonChartConfig: ChartConfig = {
  mobile: { label: "Mobile", color: "var(--color-blue-600)" },
  desktop: { label: "Desktop", color: "var(--color-purple-600)" },
};

const timelineChartConfig: ChartConfig = {
  mobile: { label: "Mobile (s)", color: "var(--color-blue-600)" },
  desktop: { label: "Desktop (s)", color: "var(--color-purple-600)" },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function parseSeconds(val: string): number {
  if (!val) return 0;
  const n = parseFloat(val.replace(/[^0-9.]/g, ""));
  return val.toLowerCase().includes("ms") ? n / 1000 : n;
}

function getScoreMeta(score: number) {
  if (score >= 90)
    return {
      label: "Strong",
      variant: "success" as const,
      color: "text-emerald-500",
      bar: "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    };
  if (score >= 50)
    return {
      label: "Needs work",
      variant: "warning" as const,
      color: "text-amber-500",
      bar: "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]",
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    };
  return {
    label: "Critical",
    variant: "destructive" as const,
    color: "text-red-500",
    bar: "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]",
    badge: "bg-red-500/10 text-red-400 border-red-500/20",
  };
}

function getVitalStatus(val: string): "good" | "warn" | "poor" {
  const n = parseFloat(val.replace(/[^0-9.]/g, ""));
  if (isNaN(n)) return "good";
  const ms = val.toLowerCase().includes("ms");
  const s = val.toLowerCase().includes("s") && !ms;
  if (s) return n < 2.5 ? "good" : n < 4 ? "warn" : "poor";
  if (ms) return n < 200 ? "good" : n < 600 ? "warn" : "poor";
  return n < 0.1 ? "good" : n < 0.25 ? "warn" : "poor";
}

function buildScoreData(m: PageSpeedResult, d: PageSpeedResult) {
  return [
    { metric: "Performance", mobile: m.performance, desktop: d.performance },
    {
      metric: "Accessibility",
      mobile: m.accessibility,
      desktop: d.accessibility,
    },
    {
      metric: "Best Practices",
      mobile: m.bestPractices,
      desktop: d.bestPractices,
    },
    { metric: "SEO", mobile: m.seo, desktop: d.seo },
  ];
}

function buildTimelineData(m: PageSpeedResult, d: PageSpeedResult) {
  return [
    {
      metric: "FCP",
      mobile: parseSeconds(m.fcp),
      desktop: parseSeconds(d.fcp),
    },
    {
      metric: "LCP",
      mobile: parseSeconds(m.lcp),
      desktop: parseSeconds(d.lcp),
    },
    {
      metric: "Speed Index",
      mobile: parseSeconds(m.speedIndex),
      desktop: parseSeconds(d.speedIndex),
    },
    {
      metric: "TTI",
      mobile: parseSeconds(m.tti),
      desktop: parseSeconds(d.tti),
    },
  ];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({
  step,
  title,
  description,
  icon: Icon,
}: {
  step: number;
  title: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <div className="flex items-center gap-5 mb-8">
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-lg font-mono font-bold text-primary shadow-[0_0_20px_-5px_rgba(var(--primary),0.3)] shrink-0">
        0{step}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
        </div>
        <p className="text-sm text-muted-foreground/80">{description}</p>
      </div>
    </div>
  );
}

function PipelineStep({
  step,
  label,
  loading,
  done,
  error,
}: {
  step: number;
  label: string;
  loading: boolean;
  done: boolean;
  error: boolean;
}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-800/50/40 backdrop-blur-md  /50 shadow-sm relative overflow-hidden group transition-all duration-300">
      {loading && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      )}
      <div className="shrink-0 relative z-10">
        {loading && (
          <Loader2 className="h-5 w-5 animate-spin text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
        )}
        {done && (
          <CheckCircle2 className="h-5 w-5 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
        )}
        {error && (
          <XCircle className="h-5 w-5 text-destructive drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
        )}
        {!loading && !done && !error && (
          <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/20" />
        )}
      </div>
      <div className="flex-1 min-w-0 relative z-10">
        <p className="text-[10px] font-mono font-semibold text-primary/60 uppercase tracking-widest mb-1">
          Task_0{step}
        </p>
        <p
          className={`text-sm font-medium truncate ${
            loading ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {label}
        </p>
        {loading && (
          <Progress
            value={null}
            className="h-0.5 mt-2.5 bg-primary/20 [&>div]:bg-primary"
          />
        )}
        {done && (
          <div className="h-0.5 mt-2.5 bg-emerald-500/50 rounded-full" />
        )}
        {error && (
          <div className="h-0.5 mt-2.5 bg-destructive/50 rounded-full" />
        )}
      </div>
    </div>
  );
}

function ScoreCard({
  label,
  value,
  Icon,
}: {
  label: string;
  value: number;
  Icon: React.ElementType;
}) {
  const meta = getScoreMeta(value);
  return (
    <Card className="relative overflow-hidden  /50 bg-zinc-800/50/30 backdrop-blur-xl hover:bg-zinc-800/50/50 transition-colors duration-500">
      <div
        className={`absolute top-0 left-0 right-0 h-1 opacity-80 ${meta.bar}`}
      />
      <CardHeader className="pb-2 pt-6 relative z-10">
        <div className="flex items-center justify-between">
          <CardDescription className="flex items-center gap-2 font-medium text-foreground/80">
            {label}
          </CardDescription>
          <span
            className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md border ${meta.badge}`}
          >
            {meta.label}
          </span>
        </div>
        <CardTitle
          className={`text-5xl font-black tracking-tighter mt-3 drop-shadow-sm ${meta.color}`}
        >
          {value}
          <span className="text-lg font-medium text-muted-foreground/50 ml-1">
            /100
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-6 pt-2 relative z-10">
        <div className="h-1.5 w-full bg-muted/40 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className={`h-full rounded-full ${meta.bar} transition-all duration-1000 ease-out`}
            style={{ width: `${value}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function VitalRow({ label, value }: { label: string; value: string }) {
  const status = getVitalStatus(value);
  const statusConfig = {
    good: {
      label: "Good",
      class: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    warn: {
      label: "Needs work",
      class: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    poor: {
      label: "Poor",
      class: "bg-red-500/10 text-red-400 border-red-500/20",
    },
  }[status];

  return (
    <div className="flex items-center justify-between py-3 text-sm group">
      <span className="text-muted-foreground group-hover:text-foreground/80 transition-colors">
        {label}
      </span>
      <div className="flex items-center gap-3">
        <span className="font-mono font-bold tracking-tight text-foreground/90 bg-muted/30 px-2 py-0.5 rounded-md">
          {value}
        </span>
        <span
          className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md border ${statusConfig.class}`}
        >
          {statusConfig.label}
        </span>
      </div>
    </div>
  );
}

function OpportunityCard({
  opp,
  variant,
}: {
  opp: {
    id: string;
    title: string;
    description: string;
    displayValue?: string;
  };
  variant: "mobile" | "desktop";
}) {
  return (
    <div
      className={`p-5 rounded-xl border relative overflow-hidden backdrop-blur-md ${
        variant === "mobile"
          ? "bg-red-500/5 border-red-500/10 hover:border-red-500/30 hover:bg-red-500/10"
          : "bg-amber-500/5 border-amber-500/10 hover:border-amber-500/30 hover:bg-amber-500/10"
      } transition-all duration-300`}
    >
      <div className="flex items-start justify-between gap-4 relative z-10">
        <h4 className="font-bold text-sm text-foreground/90 leading-snug">
          {opp.title}
        </h4>
        {opp.displayValue && (
          <Badge
            variant="outline"
            className={`shrink-0 text-xs font-mono font-semibold backdrop-blur-sm ${
              variant === "mobile"
                ? "border-red-500/30 text-red-400 bg-red-500/5"
                : "border-amber-500/30 text-amber-400 bg-amber-500/5"
            }`}
          >
            {opp.displayValue}
          </Badge>
        )}
      </div>
      <p className="text-xs text-muted-foreground/80 leading-relaxed mt-2.5 relative z-10">
        {opp.description}
      </p>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Page() {
  const { slug }: { slug: string[] } = useParams();
  const recURL = decodeURIComponent(slug?.join("//") || "");
  console.log("parameters", recURL);
  const [url, setUrl] = useState(URL.canParse(recURL) ? recURL : "");
  const [auditRunning, setAuditRunning] = useState(false);

  const [copy, setCopy] = useState<string | null>(null);
  const [copyLoading, setCopyLoading] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);

  const [mobile, setMobile] = useState<PageSpeedResult | null>(null);
  const [mobileLoading, setMobileLoading] = useState(false);
  const [mobileError, setMobileError] = useState<string | null>(null);

  const [desktop, setDesktop] = useState<PageSpeedResult | null>(null);
  const [desktopLoading, setDesktopLoading] = useState(false);
  const [desktopError, setDesktopError] = useState<string | null>(null);

  const [summary, setSummary] = useState<string | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  const hasAnyResult = !!(mobile || desktop || copy || summary);

  async function runAudit() {
    if (!url) return;
    setCopy(null);
    setCopyError(null);
    setMobile(null);
    setMobileError(null);
    setDesktop(null);
    setDesktopError(null);
    setSummary(null);
    setSummaryError(null);

    setAuditRunning(true);
    setCopyLoading(true);
    setMobileLoading(true);
    setDesktopLoading(true);

    const target = url.startsWith("http") ? url : `https://${url}`;
    const techStack = getTechStack(target).then((res) => res);
    console.log(techStack);
    const jinaPromise = fetchWebsiteCopy(target)
      .then((res) => {
        setCopy(res);
        return res;
      })
      .catch((err) => {
        setCopyError(err.message || "Failed to scrape page copy");
        return null;
      })
      .finally(() => setCopyLoading(false));

    const mobilePromise = fetchPageSpeed(target, "mobile")
      .then((res) => {
        setMobile(res);
        return res;
      })
      .catch((err) => {
        setMobileError(err.message || "Mobile metrics failed");
        return null;
      })
      .finally(() => setMobileLoading(false));

    const desktopPromise = fetchPageSpeed(target, "desktop")
      .then((res) => {
        setDesktop(res);
        return res;
      })
      .catch((err) => {
        setDesktopError(err.message || "Desktop metrics failed");
        return null;
      })
      .finally(() => setDesktopLoading(false));

    Promise.allSettled([jinaPromise, mobilePromise, desktopPromise]).then(
      async (results) => {
        setAuditRunning(false);
        setSummaryLoading(true);
        const resolvedCopy =
          results[0].status === "fulfilled" ? results[0].value : null;
        const resolvedMobile =
          results[1].status === "fulfilled" ? results[1].value : null;
        const resolvedDesktop =
          results[2].status === "fulfilled" ? results[2].value : null;
        try {
          const resultSummary = await generateAuditSummary({
            url: target,
            mobile: resolvedMobile,
            desktop: resolvedDesktop,
            copy: resolvedCopy,
          });
          setSummary(resultSummary);
        } catch (err: any) {
          setSummaryError(
            err.message || "AI failed to compile the audit summary.",
          );
        } finally {
          setSummaryLoading(false);
        }
      },
    );
  }
  const [urlErr, setUrlErr] = useState<string>("");
  const scoreData = mobile && desktop ? buildScoreData(mobile, desktop) : [];
  const timelineData =
    mobile && desktop ? buildTimelineData(mobile, desktop) : [];

  return (
    <main className="min-h-screen bg-background relative overflow-hidden text-foreground">
      <SetSections
        sections={[
          { label: "Top", link: "#" },
          { label: "Copy", link: "#copy" },
          { label: "Performance", link: "#performance" },
          { label: "Optimization Opportunities", link: "#optimization" },
          { label: "AI Diagnos", link: "#aidiag" },
          { label: "RAW", link: "#raw" },
        ]}
      />
      <div className="container mx-auto max-w-6xl px-4 py-16 space-y-16 relative z-10">
        {/* ── Hero + Input ── */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              AI Diagnostics Engine Active
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground to-foreground/50 drop-shadow-sm">
              Audit any website in 30 seconds
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Surface performance gaps, SEO issues, and copy weaknesses —
              formatted as a clear brief your client can read and act on
              immediately.
            </p>
          </div>

          <Card className=" /50 shadow-[0_0_40px_-15px_rgba(var(--primary),0.2)] bg-zinc-800/50/40 backdrop-blur-2xl mt-4">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 group">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    placeholder="https://yourclient.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && !auditRunning && runAudit()
                    }
                    disabled={auditRunning}
                    className="pl-12 py-2 text-lg font-mono bg-background/50 border-border/50 focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all shadow-inner"
                  />
                </div>
                <div className="group shrink-0">
                  <Button
                    onClick={runAudit}
                    disabled={auditRunning || !url}
                    size="lg"
                    className="px-5 py-2 text-base font-bold text-foreground shadow-xl transition-all"
                  >
                    {auditRunning ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin text-primary" />
                        <span className="animate-pulse">Analyzing...</span>
                      </>
                    ) : (
                      "Initialize Audit"
                    )}
                  </Button>
                </div>
              </div>

              {/* Pipeline steps — shown only during or after run */}
              {(auditRunning || hasAnyResult) && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border/30">
                  <PipelineStep
                    step={1}
                    label="Fetching layout & copy"
                    loading={copyLoading}
                    done={!!copy && !copyLoading}
                    error={!!copyError && !copyLoading}
                  />
                  <PipelineStep
                    step={2}
                    label="Mobile lighthouse check"
                    loading={mobileLoading}
                    done={!!mobile && !mobileLoading}
                    error={!!mobileError && !mobileLoading}
                  />
                  <PipelineStep
                    step={3}
                    label="Desktop rendering speed"
                    loading={desktopLoading}
                    done={!!desktop && !desktopLoading}
                    error={!!desktopError && !desktopLoading}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ════════════════════════════════════════════════
            SECTION 1 — PERFORMANCE SCORES
        ════════════════════════════════════════════════ */}
        {copy && (
          <Card
            className=" /50 shadow-lg p-0 bg-zinc-800/50/30 backdrop-blur-xl mt-6"
            id="copy"
          >
            <CardHeader className="border-b border-border/50 bg-muted/20 pt-5 pb-4">
              <CardTitle className="text-lg font-bold">
                Your Website Overall content and Copy
              </CardTitle>
              <CardDescription>
                Parsed hierarchical view of extracted structural text and
                images.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <CopyRenderer copy={copy} />
            </CardContent>
          </Card>
        )}
        {(mobile || mobileLoading || mobileError) && (
          <section className="space-y-6  pt-16 py-6" id="performance">
            <SectionHeader
              step={1}
              title="Performance Metrics"
              description="Google Lighthouse scoring determining real-user experience thresholds."
              icon={Zap}
            />

            {mobileError && (
              <Alert
                variant="destructive"
                className="bg-destructive/10 border-destructive/20 backdrop-blur-md"
              >
                <AlertTriangle className="h-5 w-5" />
                <AlertTitle className="font-bold tracking-wide">
                  Telemetry Failed
                </AlertTitle>
                <AlertDescription className="text-destructive/90">
                  {mobileError}
                </AlertDescription>
              </Alert>
            )}

            {mobileLoading && !mobile && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-36 w-full rounded-2xl bg-zinc-800/50/40 backdrop-blur-md"
                  />
                ))}
              </div>
            )}

            {mobile && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                  <ScoreCard
                    value={mobile.performance}
                    label="Performance"
                    Icon={Zap}
                  />
                  <ScoreCard
                    label="Accessibility"
                    value={mobile.accessibility}
                    Icon={ShieldCheck}
                  />
                  <ScoreCard
                    label="Best Practices"
                    value={mobile.bestPractices}
                    Icon={LayoutGrid}
                  />
                  <ScoreCard label="SEO" value={mobile.seo} Icon={Search} />
                </div>

                {desktop && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
                    {/* Grouped bar chart */}
                    <Card className="lg:col-span-2  /50 bg-zinc-800/50/30 backdrop-blur-xl shadow-lg">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-bold">
                          Device Comparison Matrix
                        </CardTitle>
                        <CardDescription>
                          Higher is optimal. Discrepancies indicate responsive
                          bottlenecks.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ChartContainer
                          config={comparisonChartConfig}
                          className="h-[300px] w-full"
                        >
                          <BarChart
                            data={scoreData}
                            margin={{
                              top: 20,
                              right: 10,
                              left: -20,
                              bottom: 0,
                            }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              vertical={false}
                              className="stroke-border/40"
                            />
                            <XAxis
                              dataKey="metric"
                              tickLine={false}
                              axisLine={false}
                              tick={{
                                fontSize: 12,
                                fill: "hsl(var(--muted-foreground))",
                              }}
                              dy={10}
                            />
                            <YAxis
                              domain={[0, 100]}
                              tickLine={false}
                              axisLine={false}
                              tick={{
                                fontSize: 11,
                                fill: "hsl(var(--muted-foreground))",
                              }}
                            />
                            <ChartTooltip
                              cursor={{ fill: "hsl(var(--muted)/0.2)" }}
                              content={
                                <ChartTooltipContent className="bg-zinc-800/50/90 backdrop-blur-xl border-border/50 shadow-2xl" />
                              }
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar
                              dataKey="mobile"
                              fill="var(--color-mobile)"
                              radius={[6, 6, 0, 0]}
                              maxBarSize={48}
                            />
                            <Bar
                              dataKey="desktop"
                              fill="var(--color-desktop)"
                              radius={[6, 6, 0, 0]}
                              maxBarSize={48}
                            />
                          </BarChart>
                        </ChartContainer>
                      </CardContent>
                    </Card>

                    {/* Radar */}
                    <Card className=" /50 shadow-lg p-0 bg-zinc-800/50/30 backdrop-blur-xl overflow-hidden flex flex-col">
                      <CardHeader className="border-b border-border/50 bg-muted/20 pt-5 pb-4 backdrop-blur-md">
                        <CardTitle className="text-lg font-bold">
                          Coverage Radar
                        </CardTitle>
                        <CardDescription>
                          Relative axis strength (Mobile)
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex items-center justify-center flex-1 py-6">
                        <ChartContainer
                          config={comparisonChartConfig}
                          className="h-[240px] w-full drop-shadow-[0_0_15px_rgba(var(--color-mobile),0.2)]"
                        >
                          <RadarChart
                            cx="50%"
                            cy="50%"
                            outerRadius="70%"
                            data={scoreData}
                          >
                            <PolarGrid stroke="hsl(var(--color-blue-600))" />
                            <PolarAngleAxis
                              dataKey="metric"
                              tick={{
                                fontSize: 11,
                                fill: "hsl(var(--muted-foreground))",
                              }}
                            />
                            <ChartTooltip
                              content={
                                <ChartTooltipContent className="bg-zinc-800/50/90 backdrop-blur-xl border-border/50" />
                              }
                            />
                            <Radar
                              dataKey="mobile"
                              fill="var(--color-mobile)"
                              fillOpacity={0.3}
                              stroke="var(--color-mobile)"
                              strokeWidth={3}
                            />
                          </RadarChart>
                        </ChartContainer>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </>
            )}
          </section>
        )}

        {/* ════════════════════════════════════════════════
            SECTION 2 — CORE WEB VITALS
        ════════════════════════════════════════════════ */}
        {(mobile || desktop || mobileLoading || desktopLoading) && (
          <section className="space-y-6  pt-16 py-6" id="optimization">
            <SectionHeader
              step={2}
              title="Core Web Vitals"
              description="Raw loading telemetry dictating rendering pipeline efficiency."
              icon={Clock}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mobile vitals */}
              <Card className=" /50 shadow-lg p-0 bg-zinc-800/50/30 backdrop-blur-xl overflow-hidden">
                <CardHeader className="border-b border-border/50 bg-muted/20 pt-5 pb-4 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold flex items-center gap-2.5">
                        <Smartphone className="h-5 w-5 text-primary" />
                        Mobile Profile
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Simulated 4G constraints
                      </CardDescription>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20 font-mono"
                    >
                      Sim_4G
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-2 space-y-0 divide-y divide-border/30">
                  {mobileLoading && (
                    <Skeleton className="h-64 w-full bg-transparent" />
                  )}
                  {mobileError && (
                    <div className="p-4">
                      <p className="text-destructive text-sm font-mono">
                        {mobileError}
                      </p>
                    </div>
                  )}
                  {mobile && (
                    <div className="px-3 py-1">
                      <VitalRow
                        label="First Contentful Paint (FCP)"
                        value={mobile.fcp}
                      />
                      <VitalRow
                        label="Largest Contentful Paint (LCP)"
                        value={mobile.lcp}
                      />
                      <VitalRow
                        label="Cumulative Layout Shift (CLS)"
                        value={mobile.cls}
                      />
                      <VitalRow
                        label="Total Blocking Time (TBT)"
                        value={mobile.tbt}
                      />
                      <VitalRow label="Speed Index" value={mobile.speedIndex} />
                      <VitalRow
                        label="Time to Interactive (TTI)"
                        value={mobile.tti}
                      />
                      <VitalRow
                        label="Server Response (TTFB)"
                        value={mobile.serverTime}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Desktop vitals */}
              <Card className=" /50 shadow-lg p-0 bg-zinc-800/50/30 backdrop-blur-xl overflow-hidden">
                <CardHeader className="border-b border-border/50 bg-muted/20 pt-5 pb-4 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold flex items-center gap-2.5">
                        <Monitor className="h-5 w-5 text-primary" />
                        Desktop Profile
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Unrestricted broadband pipeline
                      </CardDescription>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20 font-mono"
                    >
                      Fiber_Env
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-2 space-y-0 divide-y divide-border/30">
                  {desktopLoading && (
                    <Skeleton className="h-64 w-full bg-transparent" />
                  )}
                  {desktopError && (
                    <div className="p-4">
                      <p className="text-destructive text-sm font-mono">
                        {desktopError}
                      </p>
                    </div>
                  )}
                  {desktop && (
                    <div className="px-3 py-1">
                      <VitalRow
                        label="First Contentful Paint (FCP)"
                        value={desktop.fcp}
                      />
                      <VitalRow
                        label="Largest Contentful Paint (LCP)"
                        value={desktop.lcp}
                      />
                      <VitalRow
                        label="Cumulative Layout Shift (CLS)"
                        value={desktop.cls}
                      />
                      <VitalRow
                        label="Total Blocking Time (TBT)"
                        value={desktop.tbt}
                      />
                      <VitalRow
                        label="Speed Index"
                        value={desktop.speedIndex}
                      />
                      <VitalRow
                        label="Time to Interactive (TTI)"
                        value={desktop.tti}
                      />
                      <VitalRow
                        label="Server Response (TTFB)"
                        value={desktop.serverTime}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Loading timeline horizontal bar chart */}
            {mobile && desktop && timelineData.length > 0 && (
              <Card className=" /50 shadow-lg p-0 bg-zinc-800/50/30 backdrop-blur-xl overflow-hidden">
                <CardHeader className="border-b border-border/50 bg-muted/20 pt-5 pb-4 backdrop-blur-md">
                  <CardTitle className="text-lg font-bold">
                    Pipeline Render Timeline
                  </CardTitle>
                  <CardDescription>
                    Delta in seconds across key milestones. Shorter bars
                    indicate faster rendering.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ChartContainer
                    config={timelineChartConfig}
                    className="h-[220px] w-full"
                  >
                    <HBarChart
                      layout="vertical"
                      data={timelineData}
                      margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={false}
                        className="stroke-border/40"
                      />
                      <XAxis
                        type="number"
                        tickLine={false}
                        axisLine={false}
                        tick={{
                          fontSize: 11,
                          fill: "hsl(var(--muted-foreground))",
                        }}
                        tickFormatter={(v) => `${v}s`}
                      />
                      <YAxis
                        type="category"
                        dataKey="metric"
                        tickLine={false}
                        axisLine={false}
                        tick={{
                          fontSize: 12,
                          fill: "hsl(var(--foreground))",
                          fontWeight: 600,
                        }}
                        width={90}
                      />
                      <ChartTooltip
                        cursor={{ fill: "hsl(var(--muted)/0.2)" }}
                        content={
                          <ChartTooltipContent
                            className="bg-zinc-800/50/90 backdrop-blur-xl border-border/50 shadow-2xl"
                            formatter={(v) => `${Number(v).toFixed(2)}s`}
                          />
                        }
                      />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar
                        dataKey="mobile"
                        fill="var(--color-mobile)"
                        radius={[0, 4, 4, 0]}
                        maxBarSize={20}
                      />
                      <Bar
                        dataKey="desktop"
                        fill="var(--color-desktop)"
                        radius={[0, 4, 4, 0]}
                        maxBarSize={20}
                      />
                    </HBarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            )}
          </section>
        )}

        {/* ════════════════════════════════════════════════
            SECTION 3 — OPPORTUNITIES
        ════════════════════════════════════════════════ */}
        {(mobile || desktop) && (
          <section className="space-y-6  pt-16 py-6">
            <SectionHeader
              step={3}
              title="Optimization Opportunities"
              description="Algorithmic suggestions flagged to recover performance deltas."
              icon={TrendingUp}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mobile opportunities */}
              <Card className=" /50 shadow-lg p-0 bg-zinc-800/50/30 backdrop-blur-xl overflow-hidden">
                <CardHeader className="border-b border-border/50 bg-muted/20 pt-5 pb-4 backdrop-blur-md">
                  <CardTitle className="text-lg font-bold flex items-center gap-2.5">
                    <Smartphone className="h-5 w-5 text-red-400" />
                    Mobile Anomalies
                  </CardTitle>
                  <CardDescription>
                    Highest impact blockers on restricted networks.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {mobileLoading && (
                    <Skeleton className="h-40 w-full bg-zinc-800/50/50" />
                  )}
                  {mobile?.opportunities && mobile.opportunities.length > 0
                    ? mobile.opportunities.map((opp) => (
                        <OpportunityCard
                          key={opp.id}
                          opp={opp}
                          variant="mobile"
                        />
                      ))
                    : mobile && (
                        <div className="py-10 text-center flex flex-col items-center gap-2">
                          <CheckCircle2 className="h-8 w-8 text-emerald-500/50" />
                          <p className="text-sm font-mono text-muted-foreground">
                            Sys. Mobile Optimized.
                          </p>
                        </div>
                      )}
                </CardContent>
              </Card>

              {/* Desktop opportunities */}
              <Card className=" /50 shadow-lg p-0 bg-zinc-800/50/30 backdrop-blur-xl overflow-hidden">
                <CardHeader className="border-b border-border/50 bg-muted/20 pt-5 pb-4 backdrop-blur-md">
                  <CardTitle className="text-lg font-bold flex items-center gap-2.5">
                    <Monitor className="h-5 w-5 text-amber-400" />
                    Desktop Anomalies
                  </CardTitle>
                  <CardDescription>
                    Structural inefficiencies on wide viewports.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {desktopLoading && (
                    <Skeleton className="h-40 w-full bg-zinc-800/50/50" />
                  )}
                  {desktop?.opportunities && desktop.opportunities.length > 0
                    ? desktop.opportunities.map((opp) => (
                        <OpportunityCard
                          key={opp.id}
                          opp={opp}
                          variant="desktop"
                        />
                      ))
                    : desktop && (
                        <div className="py-10 text-center flex flex-col items-center gap-2">
                          <CheckCircle2 className="h-8 w-8 text-emerald-500/50" />
                          <p className="text-sm font-mono text-muted-foreground">
                            Sys. Desktop Optimized.
                          </p>
                        </div>
                      )}
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════════
            SECTION 4 — AI AUDIT SUMMARY
        ════════════════════════════════════════════════ */}
        {(summaryLoading || summary || summaryError) && (
          <section className="space-y-6  pt-16 py-6" id="aidiag">
            <SectionHeader
              step={4}
              title="AI Diagnostic Synthesis"
              description="Generative analysis combining lighthouse metrics, vitals, and extracted DOM copy."
              icon={FileText}
            />

            <Card className="relative border p-0 overflow-hidden bg-black/60 backdrop-blur-2xl border-primary/40 shadow-[0_0_50px_-10px_rgba(var(--primary),0.25)]">
              {/* AI animated top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 animate-[shimmer_3s_infinite] opacity-80" />

              <CardHeader className="border-b border-white/5 bg-white/5 pt-6 pb-5">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-black">
                      Executive Audit Brief
                    </CardTitle>
                    <CardDescription className="text-muted-foreground/70 mt-1">
                      Synthesized neural diagnostic output
                    </CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/30 font-mono animate-pulse"
                  >
                    LLM Engine Online
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-8 px-6 md:px-10">
                {summaryLoading && (
                  <div className="flex flex-col items-center justify-center py-20 gap-6">
                    <div className="relative">
                      <Loader
                        size={48}
                        className="text-primary relative z-10"
                      />
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-lg font-mono font-bold text-foreground">
                        Synthesizing telemetry data...
                      </p>
                      <p className="text-sm text-muted-foreground font-mono">
                        Estimating completion in ~20s. Please hold.
                      </p>
                    </div>
                  </div>
                )}
                {summaryError && (
                  <Alert
                    variant="destructive"
                    className="bg-destructive/10 border-destructive/20 backdrop-blur-md"
                  >
                    <AlertTriangle className="h-5 w-5" />
                    <AlertTitle>Neural Synthesis Failed</AlertTitle>
                    <AlertDescription>{summaryError}</AlertDescription>
                  </Alert>
                )}
                {summary && !summaryLoading && (
                  <article
                    className="prose prose-invert max-w-none text-foreground/90 
                    prose-headings:font-black prose-headings:tracking-tight prose-headings:text-foreground
                    prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-primary/90
                    prose-p:text-base prose-p:leading-relaxed prose-p:text-muted-foreground
                    prose-li:text-base prose-li:text-muted-foreground
                    prose-strong:text-foreground/90 prose-strong:font-bold
                    prose-a:text-primary hover:prose-a:text-primary/80"
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {summary}
                    </ReactMarkdown>
                  </article>
                )}
              </CardContent>
              <CardFooter className="border-t border-white/5 bg-black/40 py-4 mt-6">
                <p className="text-[11px] font-mono text-muted-foreground/50 w-full text-center uppercase tracking-widest">
                  Caution: Always verify diagnostic metrics before deploying
                  server-level mutations.
                </p>
              </CardFooter>
            </Card>
          </section>
        )}

        {/* ════════════════════════════════════════════════
            SECTION 5 — RAW WEBSITE COPY
        ════════════════════════════════════════════════ */}
        {(copy || copyLoading || copyError) && (
          <section className="space-y-6  pt-16 py-6" id="raw">
            <SectionHeader
              step={5}
              title="Raw Crawler Extraction"
              description="Unfiltered markup payload utilized for SEO footprint analysis."
              icon={FileText}
            />

            {copyError && (
              <Alert
                variant="destructive"
                className="bg-destructive/10 border-destructive/20 backdrop-blur-md"
              >
                <AlertTriangle className="h-5 w-5" />
                <AlertTitle>Extraction Fault</AlertTitle>
                <AlertDescription>{copyError}</AlertDescription>
              </Alert>
            )}

            {copyLoading && (
              <Skeleton className="h-80 w-full rounded-2xl bg-zinc-800/50/40 backdrop-blur-md" />
            )}

            {copy && !copyLoading && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card className=" /50 shadow-lg p-0 bg-zinc-800/50/30 backdrop-blur-xl lg:col-span-1 h-fit">
                  <CardHeader className="border-b border-border/50 bg-muted/20 pt-5 pb-4">
                    <CardTitle className="text-lg font-bold">
                      Payload Stats
                    </CardTitle>
                    <CardDescription>Volume metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="p-5 space-y-4">
                    <div className="flex justify-between items-center group">
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        Characters
                      </span>
                      <Badge
                        variant="outline"
                        className="font-mono text-primary border-primary/20 bg-primary/5"
                      >
                        {copy.length.toLocaleString()}
                      </Badge>
                    </div>
                    <Separator className="bg-border/50" />
                    <div className="flex justify-between items-center group">
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        ~Words
                      </span>
                      <Badge
                        variant="outline"
                        className="font-mono text-primary border-primary/20 bg-primary/5"
                      >
                        {Math.round(copy.length / 6).toLocaleString()}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className=" /50 shadow-lg p-0 bg-zinc-800/50/30 backdrop-blur-xl lg:col-span-3">
                  <CardHeader className="border-b border-border/50 bg-muted/20 pt-5 pb-4">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <Monitor className="h-4 w-4" />
                      Terminal Output
                    </CardTitle>
                    <CardDescription>
                      Direct read of extracted node string array.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[400px] w-full bg-black/60 rounded-b-xl">
                      <div className="p-6">
                        <pre className="text-xs font-mono whitespace-pre-wrap leading-relaxed text-emerald-400/80">
                          {copy}
                        </pre>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            )}
          </section>
        )}

        {/* Empty state */}
        {!hasAnyResult && !auditRunning && (
          <div className="flex flex-col items-center justify-center py-32 text-center gap-6 relative z-10">
            <div className="relative group">
              <div className="h-20 w-20 rounded-2xl bg-zinc-800/50/50 backdrop-blur-xl  /50 flex items-center justify-center relative z-10 shadow-xl">
                <Globe className="h-10 w-10 text-primary/70" />
              </div>
            </div>
            <div>
              <p className="text-xl font-bold tracking-tight text-foreground">
                Awaiting Target URL
              </p>
              <p className="text-base text-muted-foreground mt-2 font-mono">
                System standing by to commence neural diagnostic run.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
