import { combineReducers } from '@reduxjs/toolkit';

// Import your module reducers here
import { authReducer } from '@/modules/auth';
import { userManagementReducer } from '@/modules/userManagement';
import { profileReducer } from '@/modules/profile/index';

import { navigationReducer } from '@/modules/shared';

export const rootReducer = combineReducers({
  // Add your reducers here
  auth: authReducer,
  navigation: navigationReducer,
  userManagement: userManagementReducer,
  profile: profileReducer,
});
