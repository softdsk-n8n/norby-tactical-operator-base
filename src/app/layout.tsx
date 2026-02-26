import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import NoiseOverlay from "@/components/NoiseOverlay";
import ThermalToggle from "@/components/ThermalToggle";
import { SoundProvider } from "@/context/SoundContext";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "OPERATOR // Arena Breakout: Infinite",
  description:
    "Tactical content hub for Arena Breakout: Infinite. Mission logs, intel, and comms uplink.",
  keywords: ["Arena Breakout", "Infinite", "gaming", "tactical", "content creator"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
        <SoundProvider>
          <NoiseOverlay />
          <ThermalToggle />
          {children}
        </SoundProvider>
      </body>
    </html>
  );
}
