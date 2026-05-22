'use client';

import dynamic from 'next/dynamic';
import LoadingScreen from '@/components/layout/LoadingScreen';
import AboutSnippet from '@/components/sections/AboutSnippet';
import SkillsMatrix from '@/components/sections/SkillsMatrix';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import Web3Section from '@/components/sections/Web3Section';
import Certifications from '@/components/sections/Certifications';
import Contact from '@/components/sections/Contact';
import CustomCursor from '@/components/ui/CustomCursor';

// Dynamic import Hero (Three.js) to avoid SSR issues
const Hero = dynamic(() => import('@/components/sections/Hero'), {
  ssr: false,
  loading: () => (
    <div className="h-screen bg-bg-primary flex items-center justify-center">
      <span className="font-mono text-accent-green animate-pulse">Loading...</span>
    </div>
  ),
});

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <Hero />
      <AboutSnippet />
      <SkillsMatrix />
      <FeaturedProjects />
      <Web3Section />
      <Certifications />
      <Contact />
    </>
  );
}
