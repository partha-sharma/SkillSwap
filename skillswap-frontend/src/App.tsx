import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LandingPage } from './pages/LandingPage';
import { Signup } from './pages/auth/Signup';
import { Login } from './pages/auth/Login';
import { OnboardingProfile } from './pages/onboarding/OnboardingProfile';
import { OnboardingSkills } from './pages/onboarding/OnboardingSkills';
import { StubDashboard } from './pages/dashboard/StubDashboard';

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      
      <Route element={<ProtectedRoute />}>
        <Route path="/onboarding/profile" element={<OnboardingProfile />} />
        <Route path="/onboarding/skills" element={<OnboardingSkills />} />
        <Route path="/dashboard" element={<StubDashboard />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster position="top-right" />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
