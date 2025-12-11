import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { resetPasswordSchema } from '../schema/auth.schema';
import { Link } from 'react-router-dom';
import { ResetPasswordForm } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { resetPasswordRequest } from '../store/actions';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ResetPassword() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { isLoading, errorMessage } = useSelector((state: RootState) => ({
    isLoading: state.auth.resetPasswordLoading,
    errorMessage: state.auth.errorMessage,
  }));

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange', // Enables real-time validation
  });

  const { watch, handleSubmit } = form;
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const onSubmit = (data: ResetPasswordForm) => {
    // TODO: Implement reset password logic
    try {
      dispatch(resetPasswordRequest(data));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-lg rounded-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold">{t('auth.resetPassword.title')}</CardTitle>
          <CardDescription>{t('auth.resetPassword.description')}</CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-6 pb-6">
            <CardContent className="space-y-5 w-full max-w-lg">
              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">{t('auth.resetPassword.password')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="password"
                        type="password"
                        placeholder={t('auth.resetPassword.passwordPlaceholder')}
                        className="w-full min-w-[300px] max-w-md h-12 text-md rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="confirmPassword">
                      {t('auth.resetPassword.confirmPassword')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="confirmPassword"
                        type="password"
                        placeholder={t('auth.resetPassword.confirmPasswordPlaceholder')}
                        className="w-full min-w-[300px] max-w-md h-12 text-md rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                    {password && confirmPassword && password !== confirmPassword && (
                      <p className="text-red-500 text-sm">
                        {t('auth.resetPassword.passwordMismatch')}
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </CardContent>

            {/* Show error message if exists */}
            {errorMessage && (
              <div className="text-red-500 text-sm text-center">{t(errorMessage as string)}</div>
            )}

            {/* Submit Button & Back to Login */}
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                variant="default"
                isLoading={isLoading}
                className="w-full h-8 text-sm rounded-lg cursor-pointer"
              >
                {isLoading ? t('auth.resetPassword.loading') : t('auth.resetPassword.submit')}
              </Button>

              <Link to="/login" className="text-sm font-medium text-center">
                {t('auth.resetPassword.backToLogin')}
              </Link>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
