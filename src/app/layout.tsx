import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TabNavigation from "@/components/TabNavigation";
import ThemeToggle from "@/components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "あみものコンパニオン",
  description: "編み物初心者のためのお助けアプリ",
  manifest: "/manifest.json",
  themeColor: "#3B82F6",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "あみコン",
  },
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.classList.toggle('dark',t==='dark')})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="fixed top-0 right-0 z-40 p-2">
          <ThemeToggle />
        </div>
        <main className="pb-20 min-h-screen">
          {children}
        </main>
        <TabNavigation />
      </body>
    </html>
  );
}
