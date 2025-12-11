import { Epic } from 'redux-observable';
import { filter, ignoreElements, map } from 'rxjs/operators';
import { navigateToRoute } from '../actions';
import { navigateTo } from '@/router/utils/helpers';

export const navigationEpic: Epic = (action$) => {
  return action$.pipe(
    filter(navigateToRoute.match),
    map((action) => {
      const { path } = action.payload;
      navigateTo(path);
      return;
    }),
    ignoreElements()
  );
};
