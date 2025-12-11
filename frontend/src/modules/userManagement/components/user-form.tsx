'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { UserFormData, UserFormProps } from '../types/index';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { actions as userManagementActions } from '../store/actions';
import { PhoneInputField } from '@/components/ui/phone-input';
import { formSchema } from '../schema/userManagement.schema';
import { z } from 'zod';

const { createUserRequest, updateUserRequest } = userManagementActions;

export function UserForm({ user, onSuccess }: UserFormProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: user
      ? {
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        }
      : {
          name: '',
          email: '',
          role: 'User',
          status: 'Active',
        },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    const userData: UserFormData = {
      name: values.name,
      email: values.email,
      role: values.role,
      status: values.status,
    };
    if (user) {
      dispatch(updateUserRequest({ id: user.id, userData } as never));
    } else {
      dispatch(createUserRequest(userData as never));
    }

    // In a real app, we would wait for the action to complete
    // For now, we'll just simulate a delay
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 1000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('userManagement.form.name')}</FormLabel>
              <FormControl>
                <Input placeholder={t('userManagement.form.namePlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('userManagement.form.email')}</FormLabel>
              <FormControl>
                <Input placeholder={t('userManagement.form.emailPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PhoneInputField {...field} name="phone" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('userManagement.form.role')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('userManagement.form.rolePlaceholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Admin">{t('userManagement.roles.admin')}</SelectItem>
                    <SelectItem value="User">{t('userManagement.roles.user')}</SelectItem>
                    <SelectItem value="Editor">{t('userManagement.roles.editor')}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('userManagement.form.status')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('userManagement.form.statusPlaceholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Active">{t('userManagement.status.active')}</SelectItem>
                    <SelectItem value="Inactive">{t('userManagement.status.inactive')}</SelectItem>
                    <SelectItem value="Pending">{t('userManagement.status.pending')}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onSuccess}>
            {t('userManagement.form.cancel')}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? t('userManagement.form.saving')
              : user
                ? t('userManagement.form.save')
                : t('userManagement.form.create')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
