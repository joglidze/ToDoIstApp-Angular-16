import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('refreshToken')) {
    return true;
  } else {
    return false;
  }
};
export const auth: CanActivateFn = (route, state) => {
  if (localStorage.getItem('refreshToken')) {
    return false;
  } else {
    return true;
  }
};
