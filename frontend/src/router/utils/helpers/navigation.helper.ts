import EventEmitter from 'eventemitter3';
import { NAVIGATE_EVENT } from '../constants';
import { To, NavigateOptions } from 'react-router-dom';

export const eventEmitter = new EventEmitter();

/**
 * Navigates to the given path if the navigation function is set.
 * @param path - The route path to navigate to.
 */
export const navigateTo = (to: To, options?: NavigateOptions): void => {
  eventEmitter.emit(NAVIGATE_EVENT, { to, options });
};
