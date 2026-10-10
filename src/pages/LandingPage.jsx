import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { ProblemSection } from '../components/landing/ProblemSection';
import { FeatureGrid } from '../components/landing/FeatureGrid';
import { HowItWorks } from '../components/landing/HowItWorks';
import { CTASection } from '../components/landing/CTASection';
import { Footer } from '../components/landing/Footer';

export const LandingPage = () => {
  return (
    <div className="flex-1 flex flex-col">
      <HeroSection />
      <ProblemSection />
      <FeatureGrid />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  );
};
