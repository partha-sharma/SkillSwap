import { useAuth } from '../../context/AuthContext';
import { H2, P } from '../../components/common/Typography';
import { Button } from '../../components/common/Button';
import { LogOut, Home, Compass, MessageSquare, Repeat, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export function StubDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link to="/" className="flex items-center gap-2 text-primary-900">
            <Repeat className="h-6 w-6 text-accent-500" />
            <span className="font-display font-bold text-xl tracking-tight">SkillSwap</span>
          </Link>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-1">
          <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 bg-primary-50 text-primary-700 rounded-md font-medium text-sm">
            <Home className="h-5 w-5" /> Dashboard
          </Link>
          <Link to="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md font-medium text-sm transition-colors">
            <Compass className="h-5 w-5" /> Discover Mentors
          </Link>
          <Link to="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md font-medium text-sm transition-colors">
            <MessageSquare className="h-5 w-5" /> Exchange Requests
          </Link>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 truncate">
              <div className="text-sm font-medium text-gray-900 truncate">{user?.fullName}</div>
              <div className="text-xs text-gray-500 truncate">{user?.email}</div>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-8 shadow-sm">
           <Button variant="ghost" size="icon" className="relative text-gray-500">
             <Bell className="h-5 w-5" />
             <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-cta-500"></span>
           </Button>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="mb-8">
            <H2 className="border-b-0 mb-1">Welcome back, {user?.fullName?.split(' ')[0]}!</H2>
            <P className="text-gray-500 mt-0">Here's an overview of your skill exchange activity.</P>
          </div>

          <div className="flex flex-col items-center justify-center h-96 bg-white rounded-2xl border border-dashed border-gray-300 text-center p-8 shadow-sm">
            <div className="h-20 w-20 bg-primary-50 rounded-full flex items-center justify-center mb-6">
              <Compass className="h-10 w-10 text-primary-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-500 max-w-md mb-8">
              Your AI-powered matches and active exchange requests will appear here. For now, sit tight while we find the perfect mentor for you.
            </p>
            <Button onClick={() => window.alert('Mahi will build this next!')}>
              Browse all users
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
