import { NavigateFunction } from 'react-router-dom';

export type ApiError = {
  status?: number;
  message: string;
  errors?: Record<string, string[]>;
};

export class ErrorHandler {
  private navigate: NavigateFunction;

  constructor(navigate: NavigateFunction) {
    this.navigate = navigate;
  }

  /**
   * Handles API errors without triggering navigation for data fetching errors
   */
  handleApiError(error: ApiError) {
    // Handle specific API error cases
    switch (error.status) {
      case 401:
        // Only navigate to unauthorized page if it's an auth error, not a data error
        if (error.message.includes('authentication') || error.message.includes('token')) {
          this.navigate('/401');
        }
        break;
      case 500:
        // Only navigate to server error page for critical system errors
        if (error.message.includes('system') || error.message.includes('critical')) {
          this.navigate('/500');
        }
        break;
      default:
        // Log error for debugging
        console.error('API Error:', error);
    }

    // Return error for component-level handling
    return error;
  }

  /**
   * Handles route errors and navigation errors
   */
  handleRouteError(error: Error) {
    // Handle routing-specific errors
    if (error.message.includes('Not Found')) {
      this.navigate('/404');
    } else {
      console.error('Route Error:', error);
      this.navigate('/500');
    }
  }
}
