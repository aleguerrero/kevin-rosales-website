"use client";

import { useEffect, useRef, useState } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  // Element that is actually scrolling: the galleries scroll inside their own
  // overflow container, not the window, so we track whichever one fired.
  const scrollerRef = useRef<Element | null>(null);

  useEffect(() => {
    const onScroll = (e: Event) => {
      const target =
        e.target === document
          ? document.scrollingElement
          : (e.target as Element);
      if (!target) return;
      scrollerRef.current = target;
      // Show button when scrolled down past 300px
      setIsVisible(target.scrollTop > 300);
    };

    // "scroll" doesn't bubble, but capture catches it from any scroll container.
    document.addEventListener("scroll", onScroll, {
      capture: true,
      passive: true,
    });

    return () =>
      document.removeEventListener("scroll", onScroll, { capture: true });
  }, []);

  const scrollToTop = () => {
    (scrollerRef.current ?? document.scrollingElement)?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={scrollToTop}
        className={`bg-black text-white p-3 rounded-full shadow-lg transition-opacity duration-300 hover:bg-gray-800 ${
          isVisible ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-label="Back to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
          />
        </svg>
      </button>
    </div>
  );
}
