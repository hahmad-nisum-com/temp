import { t } from 'i18next';
import * as z from 'zod';
export const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters',
  }),
  email: z.string().email({
    message: t('userManagement.validation.emailRequired'),
  }),
  role: z.enum(['Admin', 'User', 'Editor'], {
    required_error: t('userManagement.validation.roleRequired'),
  }),
  status: z.enum(['Active', 'Inactive', 'Pending'], {
    required_error: t('userManagement.validation.statusRequired'),
  }),
});
