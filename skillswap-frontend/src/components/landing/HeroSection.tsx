import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { H1, P } from '../common/Typography';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-white pt-16 md:pt-24 lg:pt-32 pb-16">
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-primary-50 to-white"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <H1 className="text-gray-900 mb-6">
          Learn More. <span className="text-primary-600">Spend Less.</span>
        </H1>
        
        <P className="mx-auto max-w-2xl text-xl text-gray-600 mb-10">
          Join the first AI-powered cashless skill exchange platform. Trade your expertise for the skills you want to learn. No money, just knowledge.
        </P>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            variant="cta" 
            size="lg" 
            className="group"
            onClick={() => navigate('/signup')}
          >
            Start Swapping Skills
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
          >
            How it works
          </Button>
        </div>
      </div>
    </section>
  );
}
