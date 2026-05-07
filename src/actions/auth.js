import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleAuthProvider } from '../firebase/firebase';

export const login = uid => ({
  type: 'LOGIN',
  uid
});

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogin = () => () => {
  return signInWithPopup(auth, googleAuthProvider);
};

export const startLoggout = () => () => {
  return signOut(auth);
};
