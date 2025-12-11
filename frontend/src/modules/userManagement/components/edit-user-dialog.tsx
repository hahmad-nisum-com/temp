'use client';

import { useTranslation } from 'react-i18next';
import type { User } from '../types/index';
import { UserForm } from './user-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface EditUserDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditUserDialog({ user, open, onOpenChange }: EditUserDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('userManagement.editUserDialog.title')}</DialogTitle>
          <DialogDescription>{t('userManagement.editUserDialog.description')}</DialogDescription>
        </DialogHeader>
        <UserForm user={user} onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
