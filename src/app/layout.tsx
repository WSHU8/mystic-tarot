import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { TarotI18nProvider } from "@/i18n/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "神秘塔罗 - 在线塔罗牌占卜",
  description: "精美的在线塔罗牌占卜应用，支持多种经典牌阵，提供专业的牌义解读。",
  keywords: ["塔罗牌", "占卜", "塔罗", "Tarot", "神秘塔罗"],
  authors: [{ name: "神秘塔罗" }],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <TarotI18nProvider>
          {children}
          <Toaster />
        </TarotI18nProvider>
      </body>
    </html>
  );
}
