import { SerwistProvider } from "@serwist/turbopack/react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import ThemeProvider from "@/providers/ThemeProvider";

const APP_NAME = "Habitual";
const APP_DEFAULT_TITLE = "Habit — Build better days";
const APP_DESCRIPTION =
  "A focused, minimalist habit tracker for better daily routines.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: APP_DEFAULT_TITLE,
  description: APP_DESCRIPTION,
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icons/icon.png",
      },
      {
        url: "/icons/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/icons/apple-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head />
      <body className="antialiased">
        <SerwistProvider swUrl="/serwist/sw.js">
          <ThemeProvider>
            <div className="min-h-screen overflow-y-auto bg-[#ededeb] text-[#111] dark:bg-[#111] dark:text-[#ededeb]">
              {children}
            </div>
          </ThemeProvider>
        </SerwistProvider>
      </body>
    </html>
  );
};

export default RootLayout;
