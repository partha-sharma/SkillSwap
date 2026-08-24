import { Link } from 'react-router-dom';
import { Repeat } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 text-white">
              <Repeat className="h-6 w-6 text-accent-400" />
              <span className="font-display font-bold text-xl tracking-tight">SkillSwap</span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm mb-6">
              The AI-powered peer-to-peer cashless skill exchange platform. Trade your expertise for the skills you want to learn.
            </p>
            <div className="text-xs text-gray-500">
              © {new Date().getFullYear()} SkillSwap (AUST CSE 3200 Course Project). All rights reserved.
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Modules</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-white transition-colors">Auth & Profiles</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">AI Matchmaking</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Exchange Requests</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Session & Review</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Community Guidelines</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
