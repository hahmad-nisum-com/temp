'use client';

import type React from 'react';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { selectUserProfile } from '../store/selectors';
import { Camera, Trash2, Upload } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function ProfileAvatar() {
  const { t } = useTranslation();
  const profile = useSelector(selectUserProfile);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // In a real app, you would upload the file to your server
    // For now, we'll just simulate an upload with progress
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: t('profile.avatar.successMessage'),
            description: new Date().toLocaleString(),
          });
          return 0;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleRemoveAvatar = () => {
    // In a real app, you would call an API to remove the avatar
    // For now, we'll just simulate success
    toast({
      title: t('profile.avatar.successMessage'),
      description: new Date().toLocaleString(),
    });
  };

  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{t('profile.avatar.title')}</CardTitle>
        <CardDescription>{t('profile.avatar.description')}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 pb-6">
        <div className="relative group">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage
              src={profile?.avatar || '/placeholder.svg?height=128&width=128'}
              alt={`${profile?.firstName} ${profile?.lastName}`}
            />
            <AvatarFallback className="text-3xl bg-primary/10 text-primary">
              {profile?.firstName?.[0]}
              {profile?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
              />
              <Camera className="h-8 w-8 text-white" />
            </label>
          </div>
        </div>

        {isUploading && (
          <div className="w-full space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-1.5" />
          </div>
        )}

        <div className="flex gap-2 mt-2">
          <Button variant="outline" size="sm" className="relative" disabled={isUploading}>
            <input
              type="file"
              className="absolute inset-0 cursor-pointer opacity-0"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <Upload className="mr-2 h-4 w-4" />
            {t('profile.avatar.upload')}
          </Button>
          <Button variant="outline" size="sm" onClick={handleRemoveAvatar} disabled={isUploading}>
            <Trash2 className="mr-2 h-4 w-4" />
            {t('profile.avatar.remove')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
