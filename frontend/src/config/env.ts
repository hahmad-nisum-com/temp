export type Environment = 'development' | 'qa' | 'production';

interface EnvironmentConfig {
  APP_ENV: Environment;
  API_URL: string;
  APP_TITLE: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_AUTH_ENABLED: boolean;
}

function getEnvironmentVariables(): EnvironmentConfig {
  const env = import.meta.env;

  // Validate environment variables
  if (!env.VITE_APP_ENV) {
    throw new Error('VITE_APP_ENV is not defined');
  }
  if (!env.VITE_API_URL) {
    throw new Error('VITE_API_URL is not defined');
  }
  if (!env.VITE_APP_TITLE) {
    throw new Error('VITE_APP_TITLE is not defined');
  }
  if (!env.VITE_GOOGLE_CLIENT_ID) {
    console.warn('VITE_GOOGLE_CLIENT_ID is not defined. Google Sign-In will not work.');
  }

  const featureFlags = {
    GOOGLE_AUTH_ENABLED: env.VITE_GOOGLE_AUTH_ENABLED || false,
    // Add feature flags here
  };

  return {
    APP_ENV: env.VITE_APP_ENV as Environment,
    API_URL: env.VITE_API_URL,
    APP_TITLE: env.VITE_APP_TITLE,
    GOOGLE_CLIENT_ID: env.VITE_GOOGLE_CLIENT_ID || '',
    ...featureFlags,
  };
}

// Create a singleton instance
const envConfig = getEnvironmentVariables();

// Freeze the config to prevent modifications
Object.freeze(envConfig);

export const env = envConfig;
