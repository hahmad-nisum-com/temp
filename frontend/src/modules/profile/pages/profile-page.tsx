'use client';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ProfileForm, ProfileAvatar } from '../components';
import { fetchProfileRequest } from '../store/actions';
import { selectProfileLoading, selectUserProfile } from '../store/selectors';
import { CalendarDays, MapPin, Briefcase, Building2 } from 'lucide-react';
import { useEffect } from 'react';
import { mockUserProfile } from '@/modules/profile/mocks/index';

export function ProfilePage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const profile = useSelector(selectUserProfile) || mockUserProfile;
  const isLoading = useSelector(selectProfileLoading);

  useEffect(() => {
    // dispatch(fetchProfileRequest());
  }, [dispatch]);

  return (
    <>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6 w-full justify-start">
          <TabsTrigger value="general">{t('profile.tabs.general')}</TabsTrigger>
          <TabsTrigger value="details">{t('profile.tabs.details')}</TabsTrigger>
          <TabsTrigger value="activity">{t('profile.tabs.activity')}</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="md:col-span-4">
              {isLoading ? <Skeleton className="h-[300px] w-full rounded-xl" /> : <ProfileAvatar />}
            </div>

            <div className="md:col-span-8">
              <Card className="border-none shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">{t('profile.personalInfo.title')}</CardTitle>
                  <CardDescription>{t('profile.personalInfo.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                      <Skeleton className="h-24 w-full" />
                    </div>
                  ) : profile ? (
                    <ProfileForm />
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">Failed to load profile information</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="details">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">{t('profile.details.title')}</CardTitle>
              <CardDescription>{t('profile.details.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              {profile && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-4">
                      <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h3 className="font-medium">{t('profile.labels.jobTitle')}</h3>
                        <p className="text-sm text-muted-foreground">
                          {profile.jobTitle || t('profile.labels.notSpecified')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h3 className="font-medium">Department</h3>
                        <p className="text-sm text-muted-foreground">
                          {profile.department || 'Not specified'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h3 className="font-medium">Location</h3>
                        <p className="text-sm text-muted-foreground">
                          {profile.location || 'Not specified'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <CalendarDays className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h3 className="font-medium">Member Since</h3>
                        <p className="text-sm text-muted-foreground">
                          {profile.createdAt
                            ? new Date(profile.createdAt).toLocaleDateString()
                            : 'Unknown'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="font-medium mb-2">Bio</h3>
                    <p className="text-sm text-muted-foreground">
                      {profile.bio || 'No bio provided'}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">{t('profile.activity.title')}</CardTitle>
              <CardDescription>{t('profile.activity.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {i === 1 ? (
                        <Briefcase className="h-5 w-5" />
                      ) : i === 2 ? (
                        <Building2 className="h-5 w-5" />
                      ) : (
                        <MapPin className="h-5 w-5" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">
                        {t(
                          `profile.activity.${i === 1 ? 'jobUpdate' : i === 2 ? 'deptUpdate' : 'locationUpdate'}`
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {i === 1
                          ? 'Changed job title to Senior Software Engineer'
                          : i === 2
                            ? 'Moved from Engineering to Product'
                            : 'Updated location to San Francisco, CA'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {i === 1 ? '2 days ago' : i === 2 ? '1 week ago' : '2 weeks ago'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
