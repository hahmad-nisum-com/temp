import { eventEmitter } from '../utils/helpers';
import { NAVIGATE_EVENT } from '../utils/constants';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const RouterListener = () => {
  const navigate = useNavigate();

  useEffect(() => {
    eventEmitter.on(NAVIGATE_EVENT, ({ to, options }) => {
      console.log('Navigation event registered:', to, options);
      navigate(to, options);
    });

    return () => {
      eventEmitter.removeListener(NAVIGATE_EVENT, () => {
        console.log('Navigation event de-registered');
      });
    };
  }, []);

  return null;
};
