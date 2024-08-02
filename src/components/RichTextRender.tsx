"use client";

import React from "react";
import DOMPurify from "dompurify";

interface RichTextRendererProps {
  content: string;
}

const RichTextRenderer: React.FC<RichTextRendererProps> = React.memo(
  ({ content }) => {
    const createMarkup = (html: string): { __html: string } => {
      return { __html: DOMPurify.sanitize(html) };
    };

    if (!content) {
      return null;
    }

    return <div dangerouslySetInnerHTML={createMarkup(content)} />;
  }
);

RichTextRenderer.displayName = "RichTextRenderer";

export default RichTextRenderer;
