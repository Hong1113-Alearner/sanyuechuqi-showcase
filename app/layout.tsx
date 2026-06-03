import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "三月初七｜清明主题 2D 横版剧情解谜游戏作品集",
  description:
    "《三月初七》是一款基于清明节文化主题的 2D 横版剧情解谜游戏，融合现实、记忆与梦境三层空间叙事，围绕亲情、遗憾与自我救赎展开。",
  keywords: [
    "三月初七",
    "Unity",
    "2D横版解谜",
    "清明节",
    "剧情解谜游戏",
    "独立游戏",
    "游戏策划作品集",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
