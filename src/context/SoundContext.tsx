"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";

type SoundContextType = {
    isMuted: boolean;
    toggleMute: () => void;
    playHover: () => void;
    playClick: () => void;
    playTyping: () => void;
    playGlitch: () => void;
    playActivate: () => void;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
    const [isMuted, setIsMuted] = useState(true); // Default muted due to browser autoplay policies
    const audioCtxRef = useRef<AudioContext | null>(null);

    // Initialize Audio Context on first interaction
    const initAudio = () => {
        if (!audioCtxRef.current) {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            audioCtxRef.current = new AudioContextClass();
        }
    };

    useEffect(() => {
        if (!isMuted) {
            initAudio();
            if (audioCtxRef.current?.state === "suspended") {
                audioCtxRef.current.resume();
            }
        }
    }, [isMuted]);

    // Synthesis Helper: Oscillator
    const playOscillator = useCallback((type: OscillatorType, frequency: number, duration: number, vol = 0.1) => {
        if (isMuted || !audioCtxRef.current) return;

        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);

        gain.gain.setValueAtTime(vol, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    }, [isMuted]);

    // Synthesis Helper: Noise (for glitches/static)
    const playNoise = useCallback((duration: number, vol = 0.05) => {
        if (isMuted || !audioCtxRef.current) return;

        const ctx = audioCtxRef.current;
        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(vol, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        // Simple bandpass filter for telephone/radio effect
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1000;

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start();
    }, [isMuted]);

    // Specific Sounds
    const playHover = useCallback(() => {
        playOscillator("sine", 800, 0.05, 0.02); // Short gentle beep
    }, [playOscillator]);

    const playClick = useCallback(() => {
        playOscillator("square", 1200, 0.1, 0.03); // Confirmatory click
        setTimeout(() => playOscillator("sine", 1800, 0.15, 0.02), 50);
    }, [playOscillator]);

    const playTyping = useCallback(() => {
        playOscillator("square", 1500 + Math.random() * 500, 0.03, 0.015); // Fast random high-pitched ticks
    }, [playOscillator]);

    const playGlitch = useCallback(() => {
        playNoise(0.2, 0.08); // Radio static burst
        playOscillator("sawtooth", 100 + Math.random() * 200, 0.1, 0.05);
    }, [playNoise, playOscillator]);

    const playActivate = useCallback(() => {
        if (isMuted || !audioCtxRef.current) return;
        initAudio();
        // Night vision boot sound effect
        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.5);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.8);
    }, [isMuted]);

    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (isMuted) {
            // It was muted, now activating
            playActivate();
        }
    };

    return (
        <SoundContext.Provider value={{ isMuted, toggleMute, playHover, playClick, playTyping, playGlitch, playActivate }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = () => {
    const context = useContext(SoundContext);
    if (context === undefined) {
        throw new Error("useSound must be used within a SoundProvider");
    }
    return context;
};
