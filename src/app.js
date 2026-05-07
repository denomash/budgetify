import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';

import AppRoutes from './routes/AppRroute';
import { auth } from './firebase/firebase';
import { startSetExpense } from './actions/expenses';
import { login, logout } from './actions/auth';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-datepicker/dist/react-datepicker.css';
import LoaderPage from './components/LoaderPage';

const store = configureStore();

const AuthGate = () => {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(login(user.uid));
        dispatch(startSetExpense()).then(() => setReady(true));
      } else {
        dispatch(logout());
        setReady(true);
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return ready ? <AppRoutes /> : <LoaderPage />;
};

createRoot(document.getElementById('app')).render(
  <Provider store={store}>
    <AuthGate />
  </Provider>
);
