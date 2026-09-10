interface StructuredDataProps {
    data: Record<string, unknown> | Record<string, unknown>[];
    /** Set when rendering more than one StructuredData block on the same
     * page so React doesn't warn about missing keys. */
    id?: string;
}

/**
 * Renders a JSON-LD <script> tag.
 *
 * Every value that reaches this component eventually gets `JSON.stringify`'d
 * into raw HTML via `dangerouslySetInnerHTML`. Most of our schema objects
 * are static, but some (post titles, tags, excerpts) come from the
 * database. If any of that text ever contains "</script>", a naive
 * JSON.stringify + dangerouslySetInnerHTML closes the script tag early and
 * the rest of the string gets parsed as HTML — a stored-XSS vector. The
 * `<` → `\u003c` escape below is the standard fix (it's what Next.js's own
 * metadata JSON-LD helpers do internally) and is a no-op for well-formed
 * JSON since `\u003c` is a valid escape inside a JS string literal.
 */
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
