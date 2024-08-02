import React from "react";
import DOMPurify from "dompurify";

interface RichTextRendererProps {
  content: string;
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content }) => {
  const createMarkup = (html: string) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  return <div dangerouslySetInnerHTML={createMarkup(content)} />;
};

export default RichTextRenderer;
