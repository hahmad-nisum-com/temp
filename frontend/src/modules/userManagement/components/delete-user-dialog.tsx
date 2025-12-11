'use client';

import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import type { User } from '../types/index';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { actions as userManagementActions } from '../store/actions';

const { deleteUserRequest } = userManagementActions;
interface DeleteUserDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteUserDialog({ user, open, onOpenChange }: DeleteUserDialogProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteUserRequest(user.id));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('userManagement.deleteUserDialog.title')}</DialogTitle>
          <DialogDescription>{t('userManagement.deleteUserDialog.description')}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            {t('userManagement.deleteUserDialog.confirmationText', {
              name: <span className="font-medium text-foreground">{user.name}</span>,
              email: user.email,
            })}
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('userManagement.deleteUserDialog.cancel')}
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            {t('userManagement.deleteUserDialog.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
