interface StructuredDataProps {
    data: Record<string, unknown> | Record<string, unknown>[];
    id?: string;
}
export default function StructuredData({ data, id }: StructuredDataProps) {
    const json = JSON.stringify(data).replace(/</g, "\\u003c");

    return (
        <script
            id={id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: json }}
        />
    );
}
