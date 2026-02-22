"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import TextScramble from "@/components/TextScramble";
import VideoCard from "@/components/VideoCard";
import UplinkButton from "@/components/UplinkButton";
import TacticalHud from "@/components/TacticalHud";
import GlitchText from "@/components/GlitchText";
import LiveFeed from "@/components/LiveFeed";
import WeaponCard from "@/components/WeaponCard";

/* ── Social Icons ─────────────────────────────── */
const DiscordIcon = (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const YoutubeIcon = (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const TelegramIcon = (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const TwitterIcon = (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const BASE_PATH = "/norby-tactical-operator-base";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* ── Scroll progress bar ───────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] h-1 origin-left bg-amber-500 shadow-[0_0_10px_#f59e0b]"
        style={{ scaleX }}
      />

      {/* ── Background grid & HUD ───────── */}
      <div className="hud-grid pointer-events-none fixed inset-0 z-0" />
      <TacticalHud />

      {/* ══════════════════════════════════ */}
      {/* ── HERO SECTION ──────────────── */}
      {/* ══════════════════════════════════ */}
      <section className="relative z-10 flex min-h-screen flex-col items-center lg:flex-row">
        {/* Left — Operator Info */}
        <div className="flex flex-1 flex-col justify-center px-8 py-20 lg:px-16">
          {/* Status bar */}
          <div className="mb-6 flex flex-col gap-4">
            <motion.div
              className="inline-flex items-center gap-2 self-start border border-amber-500/30 bg-amber-500/5 px-3 py-1.5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-amber-500">
                system online // node_v4.2.1
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <LiveFeed />
            </motion.div>
          </div>

          {/* Operator Name */}
          <h1 className="mb-4 text-5xl font-bold uppercase leading-tight tracking-wider text-amber-500 md:text-7xl">
            <TextScramble text="CALLSIGN:" delay={200} duration={800} />
            <br />
            <span className="text-white">
              <GlitchText text="NORBY_TV" />
            </span>
          </h1>

          {/* Mission Briefing (About Me Intro) */}
          <motion.div
            className="mb-8 max-w-lg border-l-2 border-amber-500/50 pl-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-amber-500/70 mb-2">
              [PERSONNEL_DOSSIER_EXTRACT]
            </p>
            <p className="font-mono text-[11px] leading-relaxed text-amber-500/50 uppercase">
              Специалист по глубокой разведке в <span className="text-amber-500">Arena Breakout: Infinite</span>.
              Тактическое преимущество достигается через юмор, пот и безупречный лут.
              Всё производство контента — от записи до монтажа — ведётся из зашифрованной базы.
            </p>
          </motion.div>

          {/* Tactical Stats */}
          <div className="mb-8 grid grid-cols-2 gap-4 sm:flex sm:gap-8">
            <motion.div className="flex flex-col" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }}>
              <span className="font-mono text-[10px] uppercase text-amber-500/30">Subscribers</span>
              <span className="font-mono text-xl font-bold text-amber-500">13.3K+</span>
            </motion.div>
            <motion.div className="flex flex-col" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2 }}>
              <span className="font-mono text-[10px] uppercase text-amber-500/30">Total Loot</span>
              <span className="font-mono text-xl font-bold text-amber-500">200K+ VAL</span>
            </motion.div>
            <motion.div className="flex flex-col" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4 }}>
              <span className="font-mono text-[10px] uppercase text-amber-500/30">Rank</span>
              <span className="font-mono text-xl font-bold text-amber-500">ELITE</span>
            </motion.div>
          </div>
        </div>

        {/* Right — Operator Image */}
        <div className="relative flex flex-1 items-center justify-center overflow-hidden h-full min-h-[500px]">
          <div className="absolute inset-x-0 top-1/2 h-[300px] w-full -translate-y-1/2 bg-amber-500/5 blur-[120px] lg:h-[400px]" />
          <motion.div
            className="relative z-10 flex h-full items-end justify-center px-4"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative h-[550px] w-auto overflow-hidden border-x border-t border-amber-500/20 bg-[#0a0a0a] lg:h-[700px] shadow-[0_-20px_50px_-12px_rgba(245,158,11,0.1)]">
              <img src={BASE_PATH + "/operator.png"} alt="Tactical Operator" className="h-full w-auto object-contain opacity-90 brightness-[0.8] contrast-[1.1] grayscale-[0.1]" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-tactical-dark to-transparent" />
              <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
                <div className="h-[2px] w-full bg-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.8)] animate-scanline-fast" />
              </div>
              <div className="absolute bottom-6 right-4 font-mono text-[9px] uppercase tracking-tighter text-amber-500/60 text-right">
                <p>equipped: hk416</p>
                <p>energy_level: monster_active</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════ */}
      {/* ── PERSONNEL DOSSIER (NEW) ───── */}
      {/* ══════════════════════════════════ */}
      <section className="relative z-10 px-8 py-20 lg:px-16 border-y border-amber-500/10">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Dossier Image Frame (Left) - Styled like PC Rig */}
          <motion.div
            className="flex-1 w-full group relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {/* Ambient Glow */}
            <div className="absolute -inset-1 bg-amber-500/20 blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>

            <div className="relative border border-amber-500/20 overflow-hidden bg-black aspect-video flex items-center justify-center">
              <img
                src={BASE_PATH + "/operator_face.jpg"}
                alt="Norby Face"
                className="h-full w-full object-cover object-[center_15%] grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
              />

              {/* Tactical Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

              <div className="absolute top-4 left-4 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                  <span className="font-mono text-[9px] text-red-500 font-bold uppercase tracking-widest">Biometric_Record</span>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 font-mono text-[9px] text-amber-500/60 uppercase text-right">
                Dossier_ID: NB-0421
                <br />
                Status: Verified
              </div>

              {/* Scanline effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none overflow-hidden">
                <div className="h-[2px] w-full bg-amber-500/40 shadow-[0_0_15px_#f59e0b] animate-scanline-fast" />
              </div>
            </div>
          </motion.div>

          {/* Dossier Text Content (Right) */}
          <div className="flex-1 space-y-8">
            <div className="space-y-2">
              <h2 className="font-mono text-3xl font-bold uppercase tracking-tighter text-amber-500">
                Personnel_Dossier
              </h2>
              <div className="h-1 w-20 bg-amber-500" />
            </div>

            <div className="space-y-6 font-mono">
              <div className="space-y-4">
                <p className="text-[11px] leading-relaxed text-amber-500/60 uppercase">
                  Мы не просто играем — мы вгрызаемся в геймплей.
                  Лут, боль, юмор и полный фокус на <span className="text-amber-500">Arena Breakout: Infinite</span>.
                  Всё производство контента ведётся из зашифрованной базы в Камоне.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Clearance", value: "LVL_05" },
                  { label: "Role", value: "SQUAD_LEAD" },
                  { label: "Deployment", value: "ACTIVE" },
                  { label: "Unit", value: "NORBY_ELITE" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col border border-amber-500/10 p-3 bg-amber-500/5">
                    <span className="text-[8px] text-amber-500/40 uppercase tracking-tighter">{item.label}</span>
                    <span className="text-sm text-white font-bold">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 border border-amber-500/10 bg-amber-500/5">
                <p className="text-[9px] text-amber-500/40 mb-1">// Operational_Directives</p>
                <ul className="space-y-1 text-[10px] text-amber-500/70 uppercase">
                  <li>• High-intensity Extraction</li>
                  <li>• Strategic Resource Acquisition</li>
                  <li>• Intel Dissemination</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ */}
      {/* ── EQUIPMENT SECTION (PC RIG) ── */}
      {/* ══════════════════════════════════ */}
      <section className="relative z-10 px-8 py-20 lg:px-16 bg-[#0a0a0a]/40">
        <div className="mb-12 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <div className="mb-6 flex items-center gap-4">
              <h2 className="font-mono text-xl uppercase tracking-[0.3em] text-white">
                <span className="text-amber-500">01_</span>SYSTEM_RIG
              </h2>
              <div className="h-px flex-1 bg-amber-500/20" />
            </div>

            <div className="grid grid-cols-1 gap-4 font-mono">
              {[
                { label: "OS", value: "WINDOWS 11 PRO // 23H2" },
                { label: "CPU", value: "AMD RYZEN 9 5950X // 16-CORE" },
                { label: "GPU", value: "RTX 3080 TI // 12GB VRAM" },
                { label: "RAM", value: "64GB DDR4 // 3600MHZ" },
                { label: "DRIVES", value: "2TB NVME + 4TB SATA" },
              ].map((spec, i) => (
                <motion.div
                  key={i}
                  className="flex justify-between border-b border-amber-500/10 py-2 hover:bg-amber-500/5 transition-colors px-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="text-amber-500/40 text-[10px]">{spec.label}</span>
                  <span className="text-amber-500 text-xs text-right">{spec.value}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="relative flex-1 group"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <div className="absolute -inset-1 bg-amber-500/20 blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
            <div className="relative border border-amber-500/20 overflow-hidden bg-black aspect-[4/5] sm:aspect-square flex items-center justify-center">
              <img
                src={BASE_PATH + "/pc_rig_iqos.jpg"}
                alt="PC Rig with IQOS"
                className="w-full h-full object-cover object-bottom grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
              />

              {/* Tactical Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Corner Watermark Cover & HUD */}
              <div className="absolute bottom-0 right-0 p-4 bg-gradient-to-tl from-black via-black/40 to-transparent">
                <div className="flex flex-col items-end gap-1 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Sys_Integrity: OK</span>
                  </div>
                  <span className="text-[7px] text-amber-500/30 uppercase tracking-tighter">Node_ID: 7721-AC // SECURED</span>
                </div>
              </div>

              <div className="absolute top-4 left-4 font-mono text-[9px] text-amber-500/60 uppercase">
                Hardware_Serial: NB-7721-AC
              </div>

              {/* Scanline effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none overflow-hidden">
                <div className="h-[2px] w-full bg-amber-500/40 shadow-[0_0_15px_#f59e0b] animate-scanline-fast" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════ */}
      {/* ── ARSENAL SECTION (LOADOUT) ─── */}
      {/* ══════════════════════════════════ */}
      <section className="relative z-10 px-8 py-20 lg:px-16">
        <div className="mb-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-amber-500/20" />
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-amber-500/60">
            ▸ tactical_loadout
          </h2>
          <div className="h-px flex-1 bg-amber-500/20" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <WeaponCard
            name="HK416"
            type="Assault Rifle"
            image="https://arena-breakout.fandom.com/ru/wiki/%D0%A4%D0%B0%D0%B9%D0%BB:HK-416.png"
            stats={[{ label: "Recoil", value: 15 }, { label: "Range", value: 85 }, { label: "Ergo", value: 60 }]}
            delay={0.1}
          />
          <WeaponCard
            name="RPK-16"
            type="LMG"
            image="https://arena-breakout.fandom.com/ru/wiki/%D0%A4%D0%B0%D0%B9%D0%BB:RPK16.png"
            stats={[{ label: "Recoil", value: 25 }, { label: "Firepower", value: 92 }, { label: "Ergo", value: 40 }]}
            delay={0.2}
          />
          <WeaponCard
            name="MK14"
            type="Marksman"
            image="https://arena-breakout.fandom.com/ru/wiki/%D0%A4%D0%B0%D0%B9%D0%BB:Mk14_EBR.png"
            stats={[{ label: "Recoil", value: 40 }, { label: "Range", value: 98 }, { label: "Ergo", value: 55 }]}
            delay={0.3}
          />
        </div>
      </section>

      {/* ══════════════════════════════════ */}
      {/* ── MISSION LOGS (VIDEOS) ─────── */}
      {/* ══════════════════════════════════ */}
      <section className="relative z-10 px-8 py-20 lg:px-16">
        <div className="mb-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-amber-500/20" />
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-amber-500/60">
            ▸ mission_logs
          </h2>
          <div className="h-px flex-1 bg-amber-500/20" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <VideoCard index={1} delay={0.1} title="Новые пушки Arena Breakout infinite - 2 сезон" url="https://www.youtube.com/watch?v=-tXFOaoQ1dc" thumbnailId="-tXFOaoQ1dc" />
          <VideoCard index={2} delay={0.2} title="Выжить на карте Ферма в Arena Breakout infinite Лут, боль или Красная?!" url="https://www.youtube.com/watch?v=dIbDW-7yvBA" thumbnailId="dIbDW-7yvBA" />
          <VideoCard index={3} delay={0.3} title="Arena Breakout Infinite — Путь новичка | Обучение и первые рейды" url="https://www.youtube.com/watch?v=RkTsMjmU7vk" thumbnailId="RkTsMjmU7vk" />
        </div>
      </section>

      {/* ══════════════════════════════════ */}
      {/* ── UPLINK SECTION ────────────── */}
      {/* ══════════════════════════════════ */}
      <section className="relative z-10 px-8 py-20 lg:px-16 mb-20">
        <div className="mb-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-amber-500/20" />
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-amber-500/60">
            ▸ comms_uplink
          </h2>
          <div className="h-px flex-1 bg-amber-500/20" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <UplinkButton label="DISCORD" href="#" icon={DiscordIcon} delay={0.1} />
          <UplinkButton label="YOUTUBE" href="https://www.youtube.com/@norby_tv" icon={YoutubeIcon} delay={0.2} />
          <UplinkButton label="TELEGRAM" href="https://t.me/norby_tv" icon={TelegramIcon} delay={0.3} />
          <UplinkButton label="TWITTER" href="#" icon={TwitterIcon} delay={0.4} />
        </div>

        <div className="mt-20 flex flex-col items-center justify-center gap-2 border-t border-amber-500/10 pt-10">
          <div className="h-10 w-[1px] bg-amber-500/30 animate-bounce" />
          <span className="font-mono text-[8px] uppercase tracking-[1em] text-amber-500/20">
            End of Line // Transmission Terminated
          </span>
        </div>
      </section>

      {/* ── FOOTER ────────────────────── */}
      <footer className="relative z-10 border-t border-amber-500/10 px-8 py-8 lg:px-16 bg-[#0a0a0a]/50">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row text-center md:text-left">
          <div className="flex flex-col">
            <span className="font-mono text-[9px] font-bold text-amber-500 uppercase">Operator: NORBY</span>
            <span className="font-mono text-[8px] uppercase tracking-widest text-amber-500/30">© 2026 camouflage intelligence protocol</span>
          </div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-amber-500/20">data link secured</p>
        </div>
      </footer>
    </main>
  );
}
