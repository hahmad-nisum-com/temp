'use client';

import { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { profileFormSchema } from '../schema';
import { updateProfileRequest } from '../store/actions';
import { selectUpdateProfileLoading, selectUserProfile } from '../store/selectors';
import type { ProfileFormData } from '../types';
import { Separator } from '@/components/ui/separator';

export function ProfileForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const profile = useSelector(selectUserProfile);
  const isLoading = useSelector(selectUpdateProfileLoading);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      email: profile?.email || '',
      phone: profile?.phone || '',
      bio: profile?.bio || '',
      jobTitle: profile?.jobTitle || '',
      department: profile?.department || '',
      location: profile?.location || '',
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    dispatch(updateProfileRequest(data));

    // In a real app, you would wait for the success action
    // For now, we'll just simulate a success
    setTimeout(() => {
      toast({
        title: t('profile.personalInfo.successMessage'),
        description: new Date().toLocaleString(),
      });
      setIsEditing(false);
    }, 1000);
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Personal Information</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('profile.personalInfo.firstName')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-muted/50' : ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('profile.personalInfo.lastName')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-muted/50' : ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('profile.personalInfo.email')}</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={true} className="bg-muted/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('profile.personalInfo.phone')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-muted/50' : ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Professional Information</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('profile.personalInfo.jobTitle')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-muted/50' : ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('profile.personalInfo.department')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-muted/50' : ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('profile.personalInfo.location')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-muted/50' : ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">About</h3>
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('profile.personalInfo.bio')}</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-muted/50 min-h-[120px]' : 'min-h-[120px]'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          {isEditing ? (
            <>
              <Button type="button" variant="outline" onClick={handleCancel}>
                {t('profile.personalInfo.cancel')}
              </Button>
              <Button type="submit" isLoading={isLoading}>
                {isLoading ? t('profile.personalInfo.saving') : t('profile.personalInfo.save')}
              </Button>
            </>
          ) : (
            <Button type="button" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
