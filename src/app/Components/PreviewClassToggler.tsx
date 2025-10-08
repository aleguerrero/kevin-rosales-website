"use client";

import { useEffect } from "react";
import { usePreview } from "./PreviewState";

export default function PreviewClassToggler() {
  const { slug } = usePreview(); // slug is non-null only while hovering

  useEffect(() => {
    const el = document.body;
    if (!el) return;

    if (slug) el.classList.add("preview-active");
    else el.classList.remove("preview-active");

    // cleanup on unmount
    return () => el.classList.remove("preview-active");
  }, [slug]);

  return null;
}
