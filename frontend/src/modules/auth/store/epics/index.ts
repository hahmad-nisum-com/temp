// Export auth epics here
import {
  signInUserEpic,
  signUpUserEpic,
  forgetPasswordEpic,
  resetPasswordEpic,
  logoutEpic,
} from './auth.epic';

export const authEpics = [
  signInUserEpic,
  signUpUserEpic,
  forgetPasswordEpic,
  resetPasswordEpic,
  logoutEpic,
];
