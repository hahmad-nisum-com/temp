import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { forgetPasswordSchema } from '../schema/auth.schema';
import { Link } from 'react-router-dom';
import { ForgetPasswordForm } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { forgetPasswordRequest } from '../store/actions';

export function ForgotPassword() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state: RootState) => ({
    isLoading: state.auth.forgetPasswordLoading,
  }));

  const form = useForm<ForgetPasswordForm>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = async (data: ForgetPasswordForm) => {
    // TODO: Implement login logic
    console.log('ForgetPasswordForm:', data);
    dispatch(forgetPasswordRequest(data));
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('auth.forgotPassword.title')}</CardTitle>
          <CardDescription>{t('auth.forgotPassword.description')}</CardDescription>
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
                      <FormLabel>{t('auth.forgotPassword.email')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('auth.forgotPassword.emailPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button isLoading={isLoading} type="submit" className="w-full">
                {isLoading ? 'Loading....' : t('auth.forgotPassword.submit')}
              </Button>
              <div className="text-sm text-muted-foreground text-center sy-4">
                <Link to="/login" className="text-primary hover:underline">
                  {t('auth.forgotPassword.backToLogin')}
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
