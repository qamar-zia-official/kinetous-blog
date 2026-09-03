import Header from "./sections/header/header";
import Port1 from "./sections/porfolio/port1";
import OurServices from "./sections/our-services/our-services";
import About from "./sections/about/about";
import OurProcess from "./sections/our-process/our-process";
import ContactForm from "./sections/contact/contact";
import StructuredData from "@/components/seo/StructuredData";
import SetSections from "../components/navbar/set-sections";

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
      <SetSections
        sections={[
          { link: "#", label: "Top" },
          { link: "#port1", label: "Portfolio 1" },
          { link: "#services", label: "Services" },
          { link: "#why", label: "Why Us" },
          { link: "#process", label: "Our Process" },
          { link: "#port2", label: "Portfolio 2" },
          { link: "#contact", label: "Contact" },
        ]}
      />
      <StructuredData data={servicesSchema} />
      <Header />
      <Port1 />
      <OurServices />
      <About />
      <OurProcess />
      <ContactForm />
    </main>
  );
}
