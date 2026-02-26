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
    const droneNodesRef = useRef<{ oscs: OscillatorType[]; gains: GainNode[]; lfos: OscillatorType[]; mainGain: GainNode } | null>(null);

    // Initialize Audio Context on first interaction
    const initAudio = () => {
        if (!audioCtxRef.current) {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            audioCtxRef.current = new AudioContextClass();
        }
    };

    const startDrone = useCallback(() => {
        if (!audioCtxRef.current || droneNodesRef.current) return;

        const ctx = audioCtxRef.current;
        const mainGain = ctx.createGain();
        mainGain.gain.setValueAtTime(0, ctx.currentTime);
        // Fade in the drone slowly over 3 seconds
        mainGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 3);
        mainGain.connect(ctx.destination);

        // We will create 3 layers:
        // 1. Deep sub bass (stable)
        // 2. Mid-low hum (drifting pitch/volume)
        // 3. Higher harmonic (drifting pitch/volume)

        const layers = [
            { type: "sine" as const, baseFreq: 55, modFreq: 0.1, modDepth: 5 }, // ~A1 sub
            { type: "triangle" as const, baseFreq: 110, modFreq: 0.05, modDepth: 10 }, // ~A2 
            { type: "sine" as const, baseFreq: 165, modFreq: 0.02, modDepth: 15 } // ~E3
        ];

        const activeOscs: any[] = [];
        const activeLfos: any[] = [];
        const activeGains: GainNode[] = [];

        layers.forEach((layer) => {
            const osc = ctx.createOscillator();
            osc.type = layer.type;
            osc.frequency.setValueAtTime(layer.baseFreq, ctx.currentTime);

            // Create LFO for pitch drifting
            const lfoFreq = ctx.createOscillator();
            lfoFreq.type = "sine";
            lfoFreq.frequency.setValueAtTime(layer.modFreq, ctx.currentTime);
            const lfoFreqGain = ctx.createGain();
            lfoFreqGain.gain.setValueAtTime(layer.modDepth, ctx.currentTime);
            lfoFreq.connect(lfoFreqGain);
            lfoFreqGain.connect(osc.frequency);

            // Layer specific volume balancing
            const layerGain = ctx.createGain();
            layerGain.gain.setValueAtTime(1 / layers.length, ctx.currentTime);

            osc.connect(layerGain);
            layerGain.connect(mainGain);

            osc.start();
            lfoFreq.start();

            activeOscs.push(osc);
            activeLfos.push(lfoFreq);
            activeGains.push(layerGain);
        });

        droneNodesRef.current = { oscs: activeOscs, gains: activeGains, lfos: activeLfos, mainGain };
    }, []);

    const stopDrone = useCallback(() => {
        if (!audioCtxRef.current || !droneNodesRef.current) return;

        const { mainGain, oscs, lfos } = droneNodesRef.current;

        // Fade out over 2 seconds
        mainGain.gain.setValueAtTime(mainGain.gain.value, audioCtxRef.current.currentTime);
        mainGain.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 2);

        // Stop nodes after fade out
        setTimeout(() => {
            oscs.forEach(o => { try { (o as any).stop() } catch (e) { } });
            lfos.forEach(l => { try { (l as any).stop() } catch (e) { } });
            mainGain.disconnect();
        }, 2100);

        droneNodesRef.current = null;
    }, []);

    useEffect(() => {
        if (!isMuted) {
            initAudio();
            if (audioCtxRef.current?.state === "suspended") {
                audioCtxRef.current.resume();
            }
            startDrone();
        } else {
            stopDrone();
        }

        // Cleanup on unmount
        return () => stopDrone();
    }, [isMuted, startDrone, stopDrone]);

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
        if (isMuted || !audioCtxRef.current) return;
        const ctx = audioCtxRef.current;

        // Mechanical keyboard / Typewriter click simulation
        const time = ctx.currentTime;

        // 1. Transient click (noise)
        const bufferSize = ctx.sampleRate * 0.015; // 15ms
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = "highpass";
        noiseFilter.frequency.value = 1000;

        const noiseGain = ctx.createGain();
        // Vary volume slightly for realism
        const vol = 0.05 + Math.random() * 0.02;
        noiseGain.gain.setValueAtTime(vol, time);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.015);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start(time);

        // 2. Thock/Resonance (low percussive impact)
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = "triangle";
        // Base frequency 150-200Hz, dropping quickly
        const pitch = 150 + Math.random() * 50;
        osc.frequency.setValueAtTime(pitch, time);
        osc.frequency.exponentialRampToValueAtTime(50, time + 0.02);

        oscGain.gain.setValueAtTime(0.04, time);
        oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

        osc.connect(oscGain);
        oscGain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + 0.02);
    }, [isMuted]);

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

    const toggleMute = useCallback(() => {
        setIsMuted(prev => {
            const willBeMuted = !prev;
            if (!willBeMuted) {
                // It wasn't muted, now activating
                // Small timeout to let state update and ctx initialize
                setTimeout(playActivate, 50);
            }
            return willBeMuted;
        });
    }, [playActivate]);

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
