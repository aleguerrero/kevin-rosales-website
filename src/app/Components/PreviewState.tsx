"use client";
import { createContext, useContext, useState } from "react";

type PreviewCtxValue = {
  slug: string | null;
  setSlug: React.Dispatch<React.SetStateAction<string | null>>;
};

const PreviewCtx = createContext<PreviewCtxValue | null>(null);

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [slug, setSlug] = useState<string | null>(null);
  return (
    <PreviewCtx.Provider value={{ slug, setSlug }}>
      {children}
    </PreviewCtx.Provider>
  );
}

export function usePreview(): PreviewCtxValue {
  const ctx = useContext(PreviewCtx);
  if (!ctx) throw new Error("usePreview must be used within PreviewProvider");
  return ctx;
}
