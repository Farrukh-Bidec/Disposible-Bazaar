"use client";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

// Component
const BlogBody = ({ body }) => {
  const options = {
    replace: (domNode) => {
      if (!domNode.name) return;

      // Headings
      if (domNode.name === "h1") {
        return (
          <h1 className="text-3xl font-bold my-4">
            {domNode.children?.map((child) => child.data || child.children?.[0]?.data)}
          </h1>
        );
      }
      if (domNode.name === "h2") {
        return (
          <h2 className="text-2xl font-semibold my-3">
            {domNode.children?.map((child) => child.data || child.children?.[0]?.data)}
          </h2>
        );
      }
      if (domNode.name === "h3") {
        return (
          <h3 className="text-xl font-semibold my-2">
            {domNode.children?.map((child) => child.data || child.children?.[0]?.data)}
          </h3>
        );
      }
      if (domNode.name === "h4") {
        return (
          <h4 className="text-lg font-medium my-2">
            {domNode.children?.map((child) => child.data || child.children?.[0]?.data)}
          </h4>
        );
      }
      if (domNode.name === "h5") {
        return (
          <h5 className="text-base font-medium my-2">
            {domNode.children?.map((child) => child.data || child.children?.[0]?.data)}
          </h5>
        );
      }
      if (domNode.name === "h6") {
        return (
          <h6 className="text-sm font-medium my-1">
            {domNode.children?.map((child) => child.data || child.children?.[0]?.data)}
          </h6>
        );
      }

      // Paragraph
      if (domNode.name === "p") {
        return (
          <p className="text-base leading-relaxed my-2">
            {domNode.children?.map((child) => child.data || child.children?.[0]?.data)}
          </p>
        );
      }

      // Span
      if (domNode.name === "span") {
        return (
          <span className="text-base">
            {domNode.children?.map((child) => child.data || child.children?.[0]?.data)}
          </span>
        );
      }

      // Anchor (links)
      if (domNode.name === "a") {
        return (
          <a
            href={domNode.attribs.href}
            className="text-blue-600 underline hover:text-blue-800"
            target={domNode.attribs.href?.startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
          >
            {domNode.children?.map((child) => child.data || child.children?.[0]?.data)}
          </a>
        );
      }

      // Lists
      if (domNode.name === "ul") {
        return <ul className="list-disc ml-6 my-3">{parse(domNode.children?.map(c => c.data || c.outerHTML).join("") || "")}</ul>;
      }
      if (domNode.name === "ol") {
        return <ol className="list-decimal ml-6 my-3">{parse(domNode.children?.map(c => c.data || c.outerHTML).join("") || "")}</ol>;
      }
      if (domNode.name === "li") {
        return (
          <li className="ml-4 my-1 text-base leading-relaxed">
            {domNode.children?.map((child) => child.data || child.children?.[0]?.data)}
          </li>
        );
      }

      // Image
      if (domNode.name === "img") {
        return (
          <img
            src={domNode.attribs.src}
            alt={domNode.attribs.alt || "Image"}
            className="my-4 rounded-lg max-w-full h-auto"
          />
        );
      }

      // Formatting
      if (domNode.name === "strong" || domNode.name === "b") {
        return <strong className="font-bold">{domNode.children?.map((child) => child.data)}</strong>;
      }
      if (domNode.name === "i" || domNode.name === "em") {
        return <em className="italic">{domNode.children?.map((child) => child.data)}</em>;
      }
      if (domNode.name === "u") {
        return <u className="underline">{domNode.children?.map((child) => child.data)}</u>;
      }

      // Blockquote
      if (domNode.name === "blockquote") {
        return (
          <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-600 my-4">
            {domNode.children?.map((child) => child.data || child.children?.[0]?.data)}
          </blockquote>
        );
      }

      // Code & Pre
      if (domNode.name === "code") {
        return <code className="bg-gray-100 px-1 py-0.5 rounded">{domNode.children?.map((child) => child.data)}</code>;
      }
      if (domNode.name === "pre") {
        return (
          <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-sm font-mono">
            {domNode.children?.map((child) => child.data)}
          </pre>
        );
      }
    },
  };

  return (
    <div className="mb-8 font-poppins">
      {parse(DOMPurify.sanitize(body || ""), options)}
    </div>
  );
};

export default BlogBody;
