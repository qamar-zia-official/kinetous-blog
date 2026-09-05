import Header from "./sections/header/header";
import StructuredData from "@/components/seo/StructuredData";

export default function LandingPage() {
    // Enterprise Service schema to optimize search engine rich snippet ingestion
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://blog.kinetous.com/#website",

        name: "Kinetous Blog",
        url: "https://blog.kinetous.com",

        description:
            "The engineering, experiments, systems, and lessons behind building an AI-native e-commerce business.",
        publisher: {
            "@type": "Organization",
            "@id": "https://kinetous.com/#organization",
        },

        inLanguage: "en",
    };

    return (
        <main className="min-h-screen overflow-hidden bg-[#070A12] text-white antialiased flex flex-col gap-4">
            <StructuredData data={websiteSchema} />
            <Header />
        </main>
    );
}
