'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { changePasswordSchema } from '../schema';
import { changePasswordRequest } from '../store/actions';
import { selectChangePasswordLoading } from '../store/selectors';
import type { ChangePasswordFormData } from '../types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

export function ChangePasswordForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectChangePasswordLoading);

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    dispatch(changePasswordRequest(data));

    // In a real app, you would wait for the success action
    // For now, we'll just simulate a success
    setTimeout(() => {
      toast({
        title: t('profile.changePassword.successMessage'),
        description: new Date().toLocaleString(),
      });
      form.reset();
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Alert variant="default" className="bg-muted">
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>{t('profile.changePassword.passwordRequirements')}</AlertDescription>
        </Alert>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('profile.changePassword.currentPassword')}</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('profile.changePassword.newPassword')}</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('profile.changePassword.confirmPassword')}</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            {t('profile.changePassword.cancel')}
          </Button>
          <Button type="submit" isLoading={isLoading}>
            {isLoading ? t('profile.changePassword.saving') : t('profile.changePassword.save')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
