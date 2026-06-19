import type { Metadata } from "next";
import {
  Archivo_Black,
  Anton,
  Bungee,
  Cormorant_Garamond,
  DM_Serif_Display,
  Inter,
  Syne,
  Unbounded,
} from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-hero-g",
});
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-hero-o",
});
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-hero-d",
});
const unbounded = Unbounded({
  subsets: ["latin"],
  weight: "900",
  variable: "--font-hero-b",
});
const bungee = Bungee({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-hero-y",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-hero-flourish",
});

export const metadata: Metadata = {
  title: "Godboy Digital Studio | AI Systems, Motion & Frontend",
  description:
    "A motion-rich editorial portfolio for Prajwal, building AI systems, agentic infrastructure, web experiences, and creative frontend work.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const fontVariables = [
    inter.variable,
    syne.variable,
    archivoBlack.variable,
    anton.variable,
    dmSerif.variable,
    unbounded.variable,
    bungee.variable,
    cormorant.variable,
  ].join(" ");

  return (
    <html lang="en" className={fontVariables}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
