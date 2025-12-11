'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Bell, Mail, Globe, Moon, Sun, Laptop } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTheme } from '@/hooks/use-theme';

export function ProfilePreferencesPage() {
  const { t, i18n } = useTranslation();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const { theme, setTheme } = useTheme();

  // const [theme, setTheme] = useState(() => {
  //   if (typeof window !== 'undefined') {
  //     return localStorage.getItem('ui-theme') || 'system';
  //   }
  //   return 'system';
  // });
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || navigator.language.split('-')[0] || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    const root = document.documentElement;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (theme === 'system') {
      root.classList.toggle('dark', systemDark);
      localStorage.removeItem('ui-theme');
    } else {
      root.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('ui-theme', theme);
    }
  }, [theme]);

  const handleNotificationChange = (type: string, checked: boolean) => {
    if (type === 'email') {
      setEmailNotifications(checked);
    } else if (type === 'push') {
      setPushNotifications(checked);
    } else if (type === 'marketing') {
      setMarketingEmails(checked);
    }

    toast({
      title: checked
        ? t('profile.preferences.toast.notificationsEnabled')
        : t('profile.preferences.toast.notificationsDisabled'),
      description: t('profile.preferences.toast.preferencesUpdated'),
    });
  };

  const handleThemeChange = (value: string) => {
    setTheme(value);
    toast({
      title: t('profile.preferences.toast.themeUpdated'),
      description: t('profile.preferences.toast.themeSetTo', { theme: value }),
    });
  };

  const handleLanguageChange = async (value: string) => {
    setLanguage(value);
    await i18n.changeLanguage(value);
    localStorage.setItem('language', value);
    toast({
      title: t('profile.preferences.toast.languageUpdated'),
      description: t('profile.preferences.toast.languageSetTo', {
        language: t(`common.languages.${value}`),
      }),
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">{t('profile.preferences.notification.title')}</CardTitle>
          </div>
          <CardDescription>{t('profile.preferences.notification.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">{t('profile.preferences.notification.email.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('profile.preferences.notification.email.description')}
                </p>
              </div>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={(checked) => handleNotificationChange('email', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">{t('profile.preferences.notification.push.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('profile.preferences.notification.push.description')}
                </p>
              </div>
            </div>
            <Switch
              checked={pushNotifications}
              onCheckedChange={(checked) => handleNotificationChange('push', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">
                  {t('profile.preferences.notification.marketing.title')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('profile.preferences.notification.marketing.description')}
                </p>
              </div>
            </div>
            <Switch
              checked={marketingEmails}
              onCheckedChange={(checked) => handleNotificationChange('marketing', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">{t('profile.preferences.display.title')}</CardTitle>
          </div>
          <CardDescription>{t('profile.preferences.display.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">{t('profile.preferences.display.theme')}</h3>
            <RadioGroup
              value={theme}
              onValueChange={handleThemeChange}
              className="flex flex-col space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="theme-light" />
                <Label htmlFor="theme-light" className="flex items-center gap-2">
                  <Sun className="h-4 w-4" /> {t('profile.preferences.theme.light')}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="theme-dark" />
                <Label htmlFor="theme-dark" className="flex items-center gap-2">
                  <Moon className="h-4 w-4" /> {t('profile.preferences.theme.dark')}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="theme-system" />
                <Label htmlFor="theme-system" className="flex items-center gap-2">
                  <Laptop className="h-4 w-4" /> {t('profile.preferences.theme.system')}
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium">{t('profile.preferences.display.language')}</h3>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{t('profile.preferences.language.english')}</SelectItem>
                <SelectItem value="es">{t('profile.preferences.language.spanish')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>{t('profile.preferences.saveButton')}</Button>
      </div>
    </div>
  );
}
