import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import 'devicon/devicon.min.css';
import ResponsiveWrapper from "@/components/ResponsiveWrapper";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CAPTAIN",
  description: "Explore the portfolio of Zaid Ahmad, a passionate Full Stack Developer and AI Enthusiast with expertise in crafting futuristic, efficient applications. Discover projects that blend cutting-edge technologies with a focus on user experience, performance, and innovation.",
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
        <ResponsiveWrapper>
        {children}
        </ResponsiveWrapper>
      </body>
    </html>
  );
}
