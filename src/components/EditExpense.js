import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const expense = useSelector(state =>
    state.expenses.find(item => item.id === id)
  );

  const onEditExpense = updates => {
    dispatch(startEditExpense(expense.id, updates));
    navigate('/');
  };

  const onRemoveExpense = () => {
    dispatch(startRemoveExpense({ id: expense.id }));
    navigate('/');
  };

  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Edit Expense</h1>
        </div>
      </div>

      <div className="content-container">
        <ExpenseForm expense={expense} onSubmit={onEditExpense} />
        <button className="button--secondary" onClick={onRemoveExpense}>
          Remove Expense
        </button>
      </div>
    </div>
  );
};

export default EditExpense;
