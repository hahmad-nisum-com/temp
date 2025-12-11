import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GoogleAuthButton } from '../components';
import { CredentialResponse } from '@react-oauth/google';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { signInFormSchema } from '../schema/auth.schema';
import { signInRequest, resetErrorMessage } from '../store/actions';
import { LoginForm } from '../types';
import { useEnv } from '@/hooks/use-env';
import { useEffect, useState } from 'react';
import { selectAuthLoginState } from '../store/selectors';

export function LoginPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const env = useEnv();
  const [errorMsg, setErrorMsg] = useState<JSX.Element | null>(null);

  const { isLoading, error } = useSelector(selectAuthLoginState);

  // TODO: Make it a custom hook
  useEffect(() => {
    if (error) {
      if (error.code === 401) {
        setErrorMsg(
          <>
            Invalid email or password - If you have forgotten your password, please click on the{' '}
            Forget Password link below.
          </>
        );
      } else {
        setErrorMsg(<>Something went wrong. Please try again later.</>);
      }
    }
  }, [error]);

  const form = useForm<LoginForm>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (data: { email: string; password: string }) => {
    dispatch(resetErrorMessage());
    dispatch(signInRequest(data));
  };

  const handleGoogleSignIn = async (response: CredentialResponse) => {
    if (response.credential) {
      console.log('response from google', response);
      // TODO: Dispatch the action and make api call in Epic and update the state once backend ready.
      // dispatch(signInRequest({ token: response.credential, provider: 'google' }));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('auth.login.title')}</CardTitle>
          <CardDescription>
            {t('auth.login.description', 'Enter your credentials to access your account')}
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('auth.login.email')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('auth.login.emailPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('auth.login.password')}</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button isLoading={isLoading} type="submit" className="w-full">
                {!isLoading ? t('auth.login.submit') : 'Loading....'}
              </Button>
              {errorMsg && (
                <div className="text-sm text-muted-foreground text-center">{errorMsg}</div>
              )}
              {env.GOOGLE_AUTH_ENABLED && (
                <GoogleAuthButton onSuccess={handleGoogleSignIn} className="px-6 pb-4" />
              )}
              <div className="text-sm text-muted-foreground text-center">
                {t('auth.login.noAccount')}{' '}
                <Link to="/signup" className="text-primary hover:underline">
                  {t('auth.login.signUp')}
                </Link>
              </div>
              <div className="text-sm text-muted-foreground text-center">
                <Link to="/forget-password" className="text-primary hover:underline">
                  {t('auth.login.forgotPassword')}
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
