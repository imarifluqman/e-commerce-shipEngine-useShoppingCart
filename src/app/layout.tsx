import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next & Sanity App",
  description: "My Next.js and Sanity.io app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >


        <nav className="flex justify-between bg-slate-500 p-4 text-white z-1000">
          <Link href={"/"} className="text-white hover:text-red-500">Apna Store</Link>
          <Link href={"/stop-watch"} className="text-white hover:text-red-500">Stop Watch</Link>
        </nav>
        {children}

      </body>
    </html >
  );
}
