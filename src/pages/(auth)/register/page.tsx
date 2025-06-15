import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useRegisterUser } from '../../../services/auth/auth.service';
import type { RegisterFormValues } from '../../../types/auth';
import { Button } from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { useAuth } from '../../../hooks/use-auth';

const RegisterPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormValues>();

  const { mutate: registerUser, isPending } = useRegisterUser();

  if (isAuthenticated) navigate('/dashboard');

  const onSubmit = (data: RegisterFormValues) => {
    setError('');
    registerUser(data, {
      onSuccess: () => {
        navigate('/login');
      },
      onError: (registrationError) => {
        setError(
          registrationError instanceof Error
            ? registrationError.message
            : 'Registration failed. Please try again.'
        );
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md rounded-lg bg-card p-8 shadow-md border">
        <Link to={"/"}>
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold">Create an account</h1>
          </div>
        </Link>

        {error && (
          <div className="mb-4 rounded-md bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            id="name"
            type="text"
            label="Name"
            {...registerField("name", {
              required: "Name is required"
            })}
            error={errors.name?.message}
          />

          <Input
            id="email"
            type="email"
            label="Email address"
            {...registerField("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            error={errors.email?.message}
          />

          <Input
            id="password"
            type="password"
            label="Password"
            {...registerField("password", {
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
            {isPending ? 'Creating account...' : 'Register'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;