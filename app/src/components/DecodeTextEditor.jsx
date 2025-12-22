// ...existing code...
"use client";

import React from "react";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";

const DecodeTextEditor = ({ body }) => {
  // if no body, render nothing
  if (!body) return null;

  // prefer sanitize if available, otherwise passthrough
  const sanitizeFn = typeof DOMPurify?.sanitize === "function" ? DOMPurify.sanitize : (s) => s;
  let cleanHtml;
  try {
    cleanHtml = sanitizeFn(body);
  } catch (err) {
    console.error("Sanitize failed, using raw body:", err);
    cleanHtml = body;
  }

  // const options = {
  //   replace: (domNode) => {
  //     if (domNode?.name === "img") {
  //       return (
  //         <img
  //           src={domNode?.attribs?.src || ""}
  //           alt={domNode?.attribs?.alt || ""}
  //           className="max-w-full h-auto rounded-lg my-2"
  //         />
  //       );
  //     }
  //     return undefined;
  //   },
  // };
  const options = {
    replace: (domNode) => {
      if (!domNode?.name) return;

      if (domNode.name === "h2")
        return <h2 className="text-3xl font-semibold my-4">{domNode.children[0].data}</h2>;

      if (domNode.name === "h3")
        return <h3 className="text-2xl font-semibold my-3">{domNode.children[0].data}</h3>;

      if (domNode.name === "h4")
        return <h4 className="text-xl font-medium my-2">{domNode.children[0].data}</h4>;

      if (domNode?.name === "img") {
        return (
          <img
            src={domNode?.attribs?.src || ""}
            alt={domNode?.attribs?.alt || ""}
            className="max-w-full h-auto rounded-lg my-2"
          />
        );
      }

      return undefined;
    },
  };


  try {
    return <div className="mb-4 font-poppins">{parse(cleanHtml, options)}</div>;
  } catch (err) {
    console.error("HTML parse error:", err);
    return <div className="mb-4 font-poppins" dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
  }
};

export default DecodeTextEditor;
// ...existing code...