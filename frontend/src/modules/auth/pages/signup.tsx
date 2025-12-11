import { Link } from 'react-router-dom';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PhoneInputField } from '@/components/ui/phone-input';
import { useForm } from 'react-hook-form';
import { signupSchema } from '../schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { t } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { SignUpForm } from '../types';
import { signUpRequest } from '../store/actions';
import { selectAuthSignUpState } from '../store/selectors';

export function SignupPage() {
  const dispatch = useDispatch();

  const { isLoading } = useSelector(selectAuthSignUpState);

  const handleSubmit = async (formData: SignUpForm) => {
    // TODO: Implement signup logic
    console.log('Signup:', formData);
    dispatch(signUpRequest(formData));
  };

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: '',
      phone: {
        countryCode: '',
        phoneNumber: '',
      },
    },
  });

  console.log('Form Errors:', form.formState.errors);
  console.log('Form Values:', form.getValues());

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('auth.register.title')}</CardTitle>
          <CardDescription>{t('auth.register.description')}</CardDescription>
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
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('auth.login.firstName')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('auth.login.firstNamePlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('auth.login.lastName')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('auth.login.lastNamePlaceholder')} {...field} />
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
                  render={({ field }) => <PhoneInputField name="phone" />}
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
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('auth.login.confirmPassword')}</FormLabel>
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
                {isLoading ? 'Loading....' : t('auth.login.signUp')}
              </Button>
              <div className="text-sm text-muted-foreground text-center">
                {t('auth.register.haveAccount')}{' '}
                <Link to="/login" className="text-primary hover:underline">
                  {t('auth.register.signIn')}
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
