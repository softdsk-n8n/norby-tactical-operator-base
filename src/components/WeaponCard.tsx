"use client";

import { motion } from "framer-motion";

interface WeaponCardProps {
    name: string;
    type: string;
    stats: { label: string; value: number }[];
    image: string;
    delay?: number;
}

export default function WeaponCard({ name, type, stats, image, delay = 0 }: WeaponCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="group relative border border-amber-500/20 bg-[#0f0f0f] p-4 overflow-hidden"
        >
            {/* Background Weapon Image (Faded) */}
            <div className="absolute right-0 top-0 h-full w-2/3 opacity-10 grayscale group-hover:scale-110 transition-transform duration-500">
                <div className="h-full w-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${image})` }} />
            </div>

            <div className="relative z-10">
                <div className="mb-2">
                    <span className="font-mono text-[9px] uppercase tracking-tighter text-amber-500/40">{type}</span>
                    <h4 className="font-mono text-lg font-bold uppercase tracking-widest text-white group-hover:text-amber-500 transition-colors">
                        {name}
                    </h4>
                </div>

                <div className="space-y-2 max-w-[150px]">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col gap-0.5">
                            <div className="flex justify-between text-[8px] uppercase font-mono text-amber-500/40">
                                <span>{stat.label}</span>
                                <span>{stat.value}%</span>
                            </div>
                            <div className="h-0.5 w-full bg-amber-500/10">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${stat.value}%` }}
                                    className="h-full bg-amber-500/50"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scanline on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
    );
}
