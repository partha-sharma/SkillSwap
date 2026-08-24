import { H2, H3, P } from '../common/Typography';
import { Badge } from '../common/Badge';
import { Sparkles, BookOpen } from 'lucide-react';

export function DualProfileSection() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <H2 className="border-b-0">The Dual-Profile System</H2>
          <P className="max-w-2xl mx-auto text-gray-600">
            Everyone has something to teach and something they want to learn. Our system makes it easy to balance both sides of your growth.
          </P>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-stretch justify-center max-w-5xl mx-auto">
          {/* Can Teach Side */}
          <div className="flex-1 bg-gradient-to-br from-primary-50 to-white border border-primary-100 rounded-2xl p-8 relative shadow-sm">
            <div className="absolute -top-6 left-8 bg-primary-100 p-3 rounded-full text-primary-600 border border-white">
              <Sparkles className="h-6 w-6" />
            </div>
            <H3 className="mt-4 mb-4 text-primary-900">I Can Teach</H3>
            <P className="text-gray-600 text-sm mb-6 mt-0">
              Share your expertise and build your reputation. The more you teach, the more you can learn.
            </P>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">React JS</Badge>
              <Badge variant="default">UI/UX Design</Badge>
              <Badge variant="default">Calculus</Badge>
              <Badge variant="default">Data Structures</Badge>
            </div>
          </div>

          {/* Wants to Learn Side */}
          <div className="flex-1 bg-gradient-to-br from-accent-50 to-white border border-accent-100 rounded-2xl p-8 relative shadow-sm">
            <div className="absolute -top-6 left-8 bg-accent-100 p-3 rounded-full text-accent-600 border border-white">
              <BookOpen className="h-6 w-6" />
            </div>
            <H3 className="mt-4 mb-4 text-accent-900">I Want to Learn</H3>
            <P className="text-gray-600 text-sm mb-6 mt-0">
              Discover mentors who can help you master new skills, paid for by the knowledge you already have.
            </P>
            <div className="flex flex-wrap gap-2">
              <Badge variant="accent">Python</Badge>
              <Badge variant="accent">Machine Learning</Badge>
              <Badge variant="accent">Public Speaking</Badge>
              <Badge variant="accent">SEO</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
