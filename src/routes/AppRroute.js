import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from '../components/ExpenseDashboard';
import AddExpense from '../components/AddExpense';
import NotFoundPage from '../components/NotFoundPage';
import EditExpense from '../components/EditExpense';
import HelpPage from '../components/HelpPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LoginPage />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="/edit/:id" element={<EditExpense />} />
      </Route>
      <Route path="/help" element={<HelpPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
