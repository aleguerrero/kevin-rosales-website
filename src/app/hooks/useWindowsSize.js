"use client";

import { useState, useEffect } from "react";

export function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        // Only runs on the client side
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Set initial size on mount
        handleResize();

        window.addEventListener("resize", handleResize);

        // Clean up event listener on unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}
