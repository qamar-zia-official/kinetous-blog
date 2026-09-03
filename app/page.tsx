import Header from "./sections/header/header";
import StructuredData from "@/components/seo/StructuredData";

export default function LandingPage() {
  // Enterprise Service schema to optimize search engine rich snippet ingestion
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://Kinetous.com/#ecommerce-services",
    name: "AI Native Full-Stack E-Commerce Automation studio",
    provider: {
      "@type": "Organization",
      "@id": "https://Kinetous.com/#organization",
    },
    description:
      "Custom Next.js e-commerce storefronts, and AI-powered automation systems For E-Commerce brands using shopify.",
    areaServed: [
      { "@type": "Country", name: "Pakistan" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Arab Emirates" },
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "1000.00",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#070A12] text-white antialiased flex flex-col gap-4">
      <StructuredData data={servicesSchema} />
      <Header />
    </main>
  );
}
