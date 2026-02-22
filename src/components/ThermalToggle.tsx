"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ThermalToggle() {
    const [isActive, setIsActive] = useState(false);

    const toggle = () => {
        const next = !isActive;
        setIsActive(next);
        document.documentElement.classList.toggle("thermal", next);
    };

    return (
        <motion.button
            onClick={toggle}
            className="fixed right-4 top-4 z-[60] border border-amber-500/40 bg-[#0f0f0f]/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-amber-500 backdrop-blur-sm transition-colors hover:border-amber-400 hover:bg-amber-500/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle thermal vision mode"
        >
            <span className="mr-2 inline-block h-2 w-2 rounded-full"
                style={{
                    backgroundColor: isActive ? "#f59e0b" : "#92610a",
                    boxShadow: isActive ? "0 0 8px #f59e0b" : "none",
                }}
            />
            thermal_mode
        </motion.button>
    );
}
