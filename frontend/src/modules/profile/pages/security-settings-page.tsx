'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle2, ShieldCheck, Smartphone, Lock } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function SecuritySettingsPage() {
  const { t } = useTranslation();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginNotifications, setLoginNotifications] = useState(true);
  const [showQRCode, setShowQRCode] = useState(false);

  const handleTwoFactorToggle = (checked: boolean) => {
    if (checked) {
      setShowQRCode(true);
    } else {
      setTwoFactorEnabled(false);
      setShowQRCode(false);
      toast({
        title: 'Two-factor authentication disabled',
        description: 'Your account is now less secure.',
      });
    }
  };

  const handleSetupComplete = () => {
    setTwoFactorEnabled(true);
    setShowQRCode(false);
    toast({
      title: 'Two-factor authentication enabled',
      description: 'Your account is now more secure.',
    });
  };

  const handleLoginNotificationsToggle = (checked: boolean) => {
    setLoginNotifications(checked);
    toast({
      title: checked ? 'Login notifications enabled' : 'Login notifications disabled',
      description: 'Your preferences have been updated.',
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">{t('profile.security.title')}</CardTitle>
          </div>
          <CardDescription>{t('profile.security.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Security Status */}
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-4">
              {twoFactorEnabled ? (
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              ) : (
                <AlertCircle className="h-8 w-8 text-amber-500" />
              )}
              <div>
                <h3 className="font-medium">{t('profile.security.status.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {twoFactorEnabled
                    ? t('profile.security.status.enabled')
                    : t('profile.security.status.disabled')}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Two-Factor Authentication */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">{t('profile.security.twoFactor.title')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('profile.security.twoFactor.description')}
                  </p>
                </div>
              </div>
              <Switch checked={twoFactorEnabled} onCheckedChange={handleTwoFactorToggle} />
            </div>

            {showQRCode && (
              <div className="mt-4 rounded-lg border p-4">
                <h4 className="font-medium mb-2">{t('profile.security.twoFactor.setupTitle')}</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('profile.security.twoFactor.setupInstructions')}
                </p>
                <div className="flex justify-center mb-4">
                  <div className="h-48 w-48 bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">QR Code Placeholder</span>
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowQRCode(false)}>
                    {t('common.cancel')}
                  </Button>
                  <Button onClick={handleSetupComplete}>
                    {t('profile.security.twoFactor.completeSetup')}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Login Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">{t('profile.security.loginNotifications.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('profile.security.loginNotifications.description')}
                </p>
              </div>
            </div>
            <Switch checked={loginNotifications} onCheckedChange={handleLoginNotificationsToggle} />
          </div>

          <Separator />

          {/* Recent Login Activity */}
          <div className="space-y-4">
            <h3 className="font-medium">{t('profile.security.recentActivity')}</h3>
            <div className="space-y-4">
              {[
                {
                  device: 'Chrome on Windows',
                  location: 'San Francisco, CA',
                  time: 'Today, 10:30 AM',
                  current: true,
                },
                {
                  device: 'Safari on iPhone',
                  location: 'San Francisco, CA',
                  time: 'Yesterday, 8:15 PM',
                  current: false,
                },
                {
                  device: 'Firefox on MacOS',
                  location: 'New York, NY',
                  time: 'Apr 18, 2023, 3:45 PM',
                  current: false,
                },
              ].map((session, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Lock className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {session.device}
                        {session.current && (
                          <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">
                            {t('common.current')}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{session.location}</div>
                      <div className="text-xs text-muted-foreground">{session.time}</div>
                    </div>
                  </div>
                  {!session.current && (
                    <Button variant="outline" size="sm">
                      {t('profile.security.sessions.logout')}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{t('profile.security.tip.title')}</AlertTitle>
        <AlertDescription>{t('profile.security.tip.description')}</AlertDescription>
      </Alert>
    </div>
  );
}
