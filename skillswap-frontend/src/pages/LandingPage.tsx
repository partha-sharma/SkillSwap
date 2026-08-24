import { HeroSection } from '../components/landing/HeroSection';
import { ProblemSection } from '../components/landing/ProblemSection';
import { DualProfileSection } from '../components/landing/DualProfileSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { SdgImpactStrip } from '../components/landing/SdgImpactStrip';
import { ComparisonTable } from '../components/landing/ComparisonTable';
import { Footer } from '../components/landing/Footer';
import { Repeat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900">
      {/* Simple Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 text-primary-900 hover:text-primary-600 transition-colors">
            <Repeat className="h-6 w-6 text-accent-500" />
            <span className="font-display font-bold text-xl tracking-tight">SkillSwap</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors hidden sm:block">
              Log in
            </Link>
            <Button size="sm" onClick={() => window.location.href='/signup'}>
              Sign up
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <HeroSection />
        <SdgImpactStrip />
        <ProblemSection />
        <DualProfileSection />
        <HowItWorksSection />
        <ComparisonTable />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
