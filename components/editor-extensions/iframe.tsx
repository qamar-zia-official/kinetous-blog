import {Node} from "@tiptap/core";
import { mergeAttributes, ReactNodeViewRenderer } from "@tiptap/react";

export const IFrame = Node.create({
    name: "iframe",
    addOptions() {
        return {
            HTMLAttributes: {},
        }
    },
    defining: true,
    addAttributes() {
        return {
            src: {
                default: null,
            },
        }
    },
    parseHTML: () => {
        return [{tag: "div", getAttrs: (el) => ({src: el.getAttribute("data-iframe")})}]
    },
    renderHTML: ({ HTMLAttributes }) => 
    {
       return  ["iframe", mergeAttributes(HTMLAttributes, { "data-iframe": "" }), 0]
    },
    addNodeView() {
        return ReactNodeViewRenderer(iframeNodeView);
      },

})



const iframeNodeView = () => {
    return <iframe></iframe>
}