import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { H2, P } from '../../components/common/Typography';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/axios';
import { Repeat } from 'lucide-react';

export function Signup() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post('/auth/register', data);
      
      // Store token and user details
      login(response.data.data.token, {
        id: response.data.data.id,
        email: data.email,
        fullName: data.fullName
      });
      
      toast.success('Account created successfully!');
      navigate('/onboarding/profile'); // Route to onboarding step 1
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Registration failed');
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
          <H2 className="border-b-0 text-2xl">Create your account</H2>
          <P className="text-gray-600 mt-2 text-sm">Join the cashless skill exchange community</P>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Full Name"
              placeholder="John Doe"
              {...register('fullName', { required: 'Full name is required' })}
              error={errors.fullName?.message as string}
            />
            <Input
              label="Email address"
              type="email"
              placeholder="john@example.com"
              {...register('email', { 
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
              })}
              error={errors.email?.message as string}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              {...register('password', { 
                required: 'Password is required',
                minLength: { value: 6, message: 'Must be at least 6 characters' }
              })}
              error={errors.password?.message as string}
            />
          </div>

          <Button type="submit" variant="cta" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Start Swapping Skills'}
          </Button>
          
          <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
