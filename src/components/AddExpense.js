import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

const AddExpense = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = expense => {
    dispatch(startAddExpense(expense));
    navigate('/');
  };

  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Add Expense</h1>
        </div>
      </div>

      <div className="content-container">
        <ExpenseForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default AddExpense;
