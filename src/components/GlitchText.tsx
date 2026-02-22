"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function GlitchText({ text, className = "" }: { text: string; className?: string }) {
    const [glitch, setGlitch] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.95) {
                setGlitch(true);
                setTimeout(() => setGlitch(false), 150);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className={`relative inline-block ${className}`}>
            <span className={`${glitch ? "opacity-0" : "opacity-100"}`}>{text}</span>
            {glitch && (
                <>
                    <span className="absolute left-0 top-0 -translate-x-1 translate-y-1 text-red-500/50 mix-blend-screen animate-pulse">
                        {text}
                    </span>
                    <span className="absolute left-0 top-0 translate-x-1 -translate-y-1 text-blue-500/50 mix-blend-screen animate-pulse">
                        {text}
                    </span>
                </>
            )}
        </span>
    );
}
