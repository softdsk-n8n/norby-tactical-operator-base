"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useSound } from "@/context/SoundContext";

const CHARS = "█▓▒░!@#$%^&*()_+-={}[]|;:<>?/~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function getRandomChar(): string {
    return CHARS[Math.floor(Math.random() * CHARS.length)];
}

interface TextScrambleProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
}

export default function TextScramble({
    text,
    className = "",
    delay = 0,
    duration = 1500,
}: TextScrambleProps) {
    const [displayText, setDisplayText] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const { playTyping } = useSound();

    const scramble = useCallback(() => {
        const totalFrames = Math.floor(duration / 30);
        let frame = 0;

        const interval = setInterval(() => {
            frame++;
            if (frame % 2 === 0) playTyping(); // Play typing sound every ~60ms

            const progress = frame / totalFrames;

            const result = text
                .split("")
                .map((char, index) => {
                    if (char === " ") return " ";
                    const charProgress = index / text.length;
                    if (progress > charProgress + 0.3) return char;
                    return getRandomChar();
                })
                .join("");

            setDisplayText(result);

            if (frame >= totalFrames) {
                clearInterval(interval);
                setDisplayText(text);
                setIsComplete(true);
            }
        }, 30);

        return () => clearInterval(interval);
    }, [text, duration, playTyping]);

    useEffect(() => {
        const timeout = setTimeout(scramble, delay);
        return () => clearTimeout(timeout);
    }, [scramble, delay]);

    return (
        <motion.span
            className={`inline-block font-mono ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: delay / 1000 }}
        >
            {displayText}
            {!isComplete && (
                <span className="animate-pulse text-amber-400">▌</span>
            )}
        </motion.span>
    );
}
