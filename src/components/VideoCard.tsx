"use client";

import { motion } from "framer-motion";

interface VideoCardProps {
    index: number;
    delay?: number;
    title: string;
    url: string;
    thumbnailId: string;
}

export default function VideoCard({ index, delay = 0, title, url, thumbnailId }: VideoCardProps) {
    const padded = String(index).padStart(2, "0");

    return (
        <motion.div
            className="card-bg group relative cursor-pointer overflow-hidden border border-amber-500/30 bg-[#0f0f0f]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            whileHover={{ scale: 1.03 }}
            onClick={() => window.open(url, "_blank")}
        >
            {/* Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
                {/* Real Thumbnail (YouTube) */}
                <img
                    src={`https://img.youtube.com/vi/${thumbnailId}/maxresdefault.jpg`}
                    alt={title}
                    className="absolute inset-0 h-full w-full object-cover opacity-60 transition-opacity duration-300 group-hover:opacity-80"
                />

                {/* Grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(245,158,11,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.3) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                    }}
                />

                {/* Play icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="flex h-16 w-16 items-center justify-center border-2 border-amber-500/50 bg-amber-500/10 transition-all duration-300 group-hover:border-amber-400 group-hover:bg-amber-500/20">
                        <svg
                            className="ml-1 h-6 w-6 text-amber-500 transition-colors group-hover:text-amber-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>

                {/* Classification badge */}
                <div className="absolute left-2 top-2 bg-amber-500/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber-500">
                    tactical_intel
                </div>

                {/* Scanline effect on hover */}
                <div className="scanline-overlay pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Card footer */}
            <div className="border-t border-amber-500/20 p-4">
                <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-amber-500 line-clamp-2 min-h-[2.5rem]">
                    {title}
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-amber-500/40">
                    mission_log_{padded} // access_granted
                </p>
            </div>

            {/* Corner accents */}
            <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-amber-500/50" />
            <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-amber-500/50" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-amber-500/50" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-amber-500/50" />
        </motion.div>
    );
}
