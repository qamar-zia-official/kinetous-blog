import Header from "./sections/header/header";
import StructuredData from "@/components/seo/StructuredData";
import {
    DEFAULT_DESCRIPTION,
    SCHEMA_IDS,
    SITE_NAME,
    SITE_URL,
} from "@/lib/seo-config";

export default function LandingPage() {
    // WebSite schema, now built from the same SCHEMA_IDS used in
    // app/layout.tsx and (blog)/posts/page.tsx — this @id has to match
    // exactly wherever it's referenced (isPartOf in the Blog schema, etc.)
    // for Google to treat them as the same entity.
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": SCHEMA_IDS.website,
        name: SITE_NAME,
        url: SITE_URL,
        description: DEFAULT_DESCRIPTION,
        publisher: {
            "@type": "Organization",
            "@id": SCHEMA_IDS.organization,
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
