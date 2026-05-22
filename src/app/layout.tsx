import type { Metadata } from 'next';
import { Inter, IBM_Plex_Mono, Space_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Web3Provider from '@/components/providers/Web3Provider';
import MatrixRain from '@/components/ui/MatrixRain';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dwi Ferdianto — AI Engineer | Cybersecurity Researcher',
  description:
    'Portfolio of Dwi Ferdianto — AI Engineer, Machine Learning Enthusiast, and Cybersecurity Researcher. Building Intelligent Systems. Breaking Weak Ones.',
  keywords: [
    'AI Engineer',
    'Machine Learning',
    'Cybersecurity',
    'Embedded Systems',
    'Portfolio',
    'Dwi Ferdianto',
    'Web3',
  ],
  authors: [{ name: 'Dwi Ferdianto' }],
  openGraph: {
    title: 'Dwi Ferdianto — AI Engineer | Cybersecurity Researcher',
    description:
      'Building Intelligent Systems. Breaking Weak Ones. Portfolio showcasing AI, ML, Cybersecurity, and Embedded Systems projects.',
    type: 'website',
    locale: 'id_ID',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <head>
        {/* Orbitron & Share Tech Mono — not available via next/font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${ibmPlexMono.variable} ${spaceMono.variable} antialiased scanline-overlay`}
      >
        <Web3Provider>
          {/* Matrix Rain Background — client component to avoid hydration mismatch */}
          <MatrixRain />
          <Navbar />
          <main className="relative z-[1]">{children}</main>
          <Footer />
        </Web3Provider>
      </body>
    </html>
  );
}
