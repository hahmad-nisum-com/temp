import { useTranslation } from 'react-i18next';
import { GoogleLogin } from '@react-oauth/google';

interface GoogleAuthButtonProps {
  onSuccess?: (response: unknown) => void;
  onError?: () => void;
  className?: string;
}

export function GoogleAuthButton({
  onSuccess = (response) => console.log(response),
  onError = () => console.log('Login Failed'),
  className = '',
}: GoogleAuthButtonProps) {
  const { t } = useTranslation();

  return (
    <div className={`flex justify-center ${className}`}>
      <div className="w-full max-w-xs">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {t('auth.login.continueWithGoogle')}
            </span>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <GoogleLogin onSuccess={onSuccess} onError={onError} />
        </div>
      </div>
    </div>
  );
}
