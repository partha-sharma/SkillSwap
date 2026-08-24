import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { H2, P } from '../../components/common/Typography';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/axios';
import { Repeat } from 'lucide-react';

export function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post('/auth/login', data);
      
      // Store token and user details
      login(response.data.data.token, {
        id: response.data.data.id, // Ensure your backend returns the user ID
        email: data.email,
        fullName: response.data.data.fullName || "User"
      });
      
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-900 mb-6">
            <Repeat className="h-8 w-8 text-accent-500" />
            <span className="font-display font-bold text-2xl tracking-tight">SkillSwap</span>
          </Link>
          <H2 className="border-b-0 text-2xl">Log in to your account</H2>
          <P className="text-gray-600 mt-2 text-sm">Welcome back to the skill exchange</P>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Email address"
              type="email"
              placeholder="john@example.com"
              {...register('email', { required: 'Email is required' })}
              error={errors.email?.message as string}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              {...register('password', { required: 'Password is required' })}
              error={errors.password?.message as string}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Log in'}
          </Button>
          
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
