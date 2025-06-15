import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useLoginUser } from '../../../services/auth/auth.service';
import { useAuth } from '../../../hooks/use-auth';
import type { LoginFormValues } from '../../../types/auth';
import { Button } from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [error, setError] = useState('');

  const {
    register: loginFields,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>();

  const { mutate: loginUser, isPending } = useLoginUser();

  if (isAuthenticated) navigate('/dashboard');

  const onSubmit = (data: LoginFormValues) => {
    setError('');
    loginUser(data, {
      onSuccess: (userData) => {
        login(userData);
        navigate('/dashboard');
      },
      onError: (loginError) => {
        setError(loginError.message ?? 'Login failed. Please try again.');
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md rounded-lg bg-card p-8 shadow-md border">
        <Link to={"/"}>
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold">Sign in to your account</h1>
          </div>
        </Link>

        {error && (
          <div className="mb-4 rounded-md bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            id="email"
            type="email"
            label="Email address"
            {...loginFields("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // Regex for validating email
                message: "Invalid email address"
              }
            })}
            error={errors.email?.message}
          />

          <Input
            id="password"
            type="password"
            label="Password"
            {...loginFields("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
            error={errors.password?.message}
          />

          <Button
            type="submit"
            variant="default"
            size="default"
            disabled={isPending}
            className="w-full"
          >
            {isPending ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-primary hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;