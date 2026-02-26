"use client";

import { motion } from "framer-motion";
import { useSound } from "@/context/SoundContext";

interface UplinkButtonProps {
    label: string;
    href: string;
    icon: React.ReactNode;
    delay?: number;
}

export default function UplinkButton({ label, href, icon, delay = 0 }: UplinkButtonProps) {
    const { playHover, playClick } = useSound();

    return (
        <motion.a
            href={href}
            onClick={playClick}
            onMouseEnter={playHover}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center gap-3 border border-amber-500/30 bg-[#0f0f0f] px-6 py-4 font-mono text-sm uppercase tracking-widest text-amber-500 transition-all hover:border-amber-400 hover:bg-amber-500/10 hover:text-amber-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Corner accents */}
            <div className="pointer-events-none absolute left-0 top-0 h-2 w-2 border-l border-t border-amber-500/60 transition-colors group-hover:border-amber-400" />
            <div className="pointer-events-none absolute right-0 top-0 h-2 w-2 border-r border-t border-amber-500/60 transition-colors group-hover:border-amber-400" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l border-amber-500/60 transition-colors group-hover:border-amber-400" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b border-r border-amber-500/60 transition-colors group-hover:border-amber-400" />

            <span className="text-amber-500/70 transition-colors group-hover:text-amber-400">
                {icon}
            </span>
            <span>[{label}]</span>
        </motion.a>
    );
}
