"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const events = [
    "Sector Farm: High value target spotted",
    "Extraction successful: Delta-6 secured",
    "Intel Update: New mission parameters received",
    "Signal interference detected in Valley sector",
    "Armory status: Ammunition replenished",
    "Loot value surge: Red items detected",
    "Operator Norby incoming to LZ",
    "Encryption sequence active... 100%",
];

export default function LiveFeed() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % events.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-widest text-amber-500/60">
            <span className="flex h-1.5 w-1.5 shrink-0 rounded-full bg-red-500 animate-pulse" />
            <span className="text-amber-500/30">LIVE_INTEL:</span>
            <div className="relative h-4 overflow-hidden w-full">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={index}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="absolute inset-0 whitespace-nowrap"
                    >
                        {events[index]}
                    </motion.p>
                </AnimatePresence>
            </div>
        </div>
    );
}
