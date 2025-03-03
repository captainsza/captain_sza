import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import 'devicon/devicon.min.css';
import { GoogleAnalytics } from '@/components/seo/google-analytics';

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

// Enhanced metadata for better SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://zaidahmadgg.com'),
  title: {
    default: 'Captain SZA | Zaid Ahmad - Full Stack Developer & AI Enthusiast',
    template: '%s | Captain SZA - Zaid Ahmad'
  },
  description: 'Portfolio of Zaid Ahmad (Captain SZA), a Full Stack Developer specializing in Next.js, TypeScript, and AI. Explore projects, skills, and professional experience in web development and artificial intelligence.',
  keywords: ['Captain SZA', 'Zaid Ahmad', 'Full Stack Developer', 'Next.js Developer', 'TypeScript', 'AI Developer', 'React Developer', 'JavaScript', 'Web Development', 'Software Engineer', 'Portfolio'],
  creator: 'Zaid Ahmad',
  authors: [{ name: 'Zaid Ahmad', url: 'https://zaidahmadgg.com' }],
  publisher: 'Zaid Ahmad',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://zaidahmadgg.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Captain SZA | Zaid Ahmad - Full Stack Developer',
    description: 'Portfolio of Zaid Ahmad (Captain SZA), showcasing innovative projects in web development, Next.js, TypeScript, and AI integration.',
    url: 'https://zaidahmadgg.com',
    siteName: 'Captain SZA Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://empiresphere.vercel.app/api/files/67c6222ae8351fb862fa9858/view?apiKey=emp_cbb0f91b-ae83-4fdc-a4e9-e1deb39ed9cc', // Create this image for social sharing
        width: 1200,
        height: 630,
        alt: 'Captain SZA - Zaid Ahmad Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Captain SZA | Zaid Ahmad - Full Stack Developer',
    description: 'Explore the digital universe of Captain SZA (Zaid Ahmad) - Full Stack Developer specializing in Next.js, TypeScript & AI.',
    creator: '@captainsza', // Replace with your Twitter handle
    images: ['https://empiresphere.vercel.app/api/files/67c6222ae8351fb862fa9858/view?apiKey=emp_cbb0f91b-ae83-4fdc-a4e9-e1deb39ed9cc'], // Create this image for Twitter sharing
  },
  verification: {
    // Add your verification strings when you have them
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    // other verification codes as needed
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon set */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
