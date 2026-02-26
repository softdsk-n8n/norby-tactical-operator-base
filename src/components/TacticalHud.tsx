"use client";

import { motion } from "framer-motion";
import { useSound } from "@/context/SoundContext";

export default function TacticalHud() {
    const { isMuted, toggleMute, playHover } = useSound();
    return (
        <div className="pointer-events-none fixed inset-0 z-20 hidden overflow-hidden lg:block">
            {/* Top Left: System Info */}
            <div className="absolute left-6 top-20 font-mono text-[9px] uppercase tracking-tighter text-amber-500/30">
                <p>cpu_load: [||||||....] 62%</p>
                <p>net_link: established</p>
                <p>node: a_broken_infinite_v2</p>
            </div>

            {/* Top Right: Time/Region */}
            <div className="absolute right-20 top-20 flex flex-col items-end font-mono text-[9px] uppercase tracking-tighter text-amber-500/30 text-right">
                <p>region: camona_farm</p>
                <p>local_time: {new Date().toLocaleTimeString()}</p>
                <p>ping: 24ms</p>

                <button
                    onClick={toggleMute}
                    onMouseEnter={playHover}
                    className="pointer-events-auto mt-3 border border-amber-500/30 bg-[#0f0f0f]/80 px-2 py-1 text-amber-500 transition-colors hover:border-amber-400 hover:bg-amber-500/20"
                >
                    [ COMMS: {isMuted ? "OFF (MUTED)" : "ON (ACTIVE)"} ]
                </button>
            </div>

            {/* Bottom Left: Coordinates (Dynamic) */}
            <div className="absolute left-6 bottom-10 font-mono text-[9px] uppercase tracking-tighter text-amber-500/20">
                <motion.div
                    animate={{ x: [0, 2, -1, 0], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <p>x: 42.9412 | y: 12.0041</p>
                    <p>alt: 142m | spd: 0.0km/h</p>
                </motion.div>
            </div>

            {/* Vertical Bars (HUD Style) */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="h-4 w-[2px] bg-amber-500/10" />
                ))}
                <div className="h-4 w-[2px] bg-amber-500/40 animate-pulse" />
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-4 w-[2px] bg-amber-500/10" />
                ))}
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-1 w-3 bg-amber-500/10" />
                ))}
                <div className="h-1 w-3 bg-amber-500/40" />
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="h-1 w-3 bg-amber-500/10" />
                ))}
            </div>

            {/* Crosshair (Subtle) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="h-2 w-10 border-x border-amber-500/10" />
                <div className="absolute left-1/2 top-1/2 h-10 w-2 -translate-x-1/2 -translate-y-1/2 border-y border-amber-500/10" />
            </div>
        </div>
    );
}
