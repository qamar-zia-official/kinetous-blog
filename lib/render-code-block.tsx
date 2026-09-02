import { createLowlight, all } from "lowlight";
import type { ReactNode } from "react";
import type { Element, Root, RootContent } from "hast";

const lowlight = createLowlight(all);

function hastToReact(node: RootContent | Root, key: string): ReactNode {
  if (node.type === "text") {
    return node.value;
  }

  if (node.type !== "element") {
    return null;
  }

  const element = node as Element;

  const className = Array.isArray(element.properties?.className)
    ? element.properties.className.join(" ")
    : typeof element.properties?.className === "string"
      ? element.properties.className
      : undefined;

  return (
    <span key={key} className={className}>
      {element.children.map((child, index) =>
        hastToReact(child, `${key}-${index}`),
      )}
    </span>
  );
}

export function renderHighlightedCodeBlock(
  code: string,
  language?: string | null,
): ReactNode {
  if (!language || language === "plaintext" || language === "text") {
    return code;
  }

  if (!lowlight.registered(language)) {
    return code;
  }

  const tree = lowlight.highlight(language, code);

  return tree.children.map((child, index) =>
    hastToReact(child, `code-${index}`),
  );
}