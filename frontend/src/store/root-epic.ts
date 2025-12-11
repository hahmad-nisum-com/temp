import { combineEpics } from 'redux-observable';
import { authEpics } from '@/modules/auth';
import { sharedEpics } from '@/modules/shared';
import { usersEpics } from '@/modules/userManagement';

// Import your module epics here
// import { authEpics } from '@/modules/auth/store/epics';

export const rootEpic = combineEpics(...authEpics, ...sharedEpics, ...usersEpics);
// Add your epics here
// ...authEpics,
