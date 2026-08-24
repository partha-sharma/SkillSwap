import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';

// Placeholder for Mahi to implement Auth views
function PlaceholderAuth({ title }: { title: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-display font-bold text-primary-900 mb-2">{title}</h1>
        <p className="text-gray-600 mb-4">Auth views will be implemented here.</p>
        <a href="/" className="text-primary-600 hover:underline">Back to Home</a>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<PlaceholderAuth title="Sign Up" />} />
        <Route path="/login" element={<PlaceholderAuth title="Log In" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
