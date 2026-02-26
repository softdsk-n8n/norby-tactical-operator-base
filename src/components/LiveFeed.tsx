"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useSound } from "@/context/SoundContext";

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
    const { playTyping } = useSound();

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => {
                // We play sound when index changes
                // small delay to sync with animation
                setTimeout(() => {
                    for (let i = 0; i < 3; i++) setTimeout(playTyping, i * 50);
                }, 100);
                return (prev + 1) % events.length;
            });
        }, 4000);
        return () => clearInterval(timer);
    }, [playTyping]);

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
