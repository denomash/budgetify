import { ref, push, remove, update, get } from 'firebase/database';
import database from '../firebase/firebase';

export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => (dispatch, getState) => {
  const uid = getState().auth.uid;
  const {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
  } = expenseData;

  const expense = { description, note, amount, createdAt };

  return push(ref(database, `users/${uid}/expenses`), expense).then(snapshot => {
    dispatch(
      addExpense({
        id: snapshot.key,
        ...expense
      })
    );
  });
};

export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const startRemoveExpense = ({ id }) => (dispatch, getState) => {
  const uid = getState().auth.uid;

  return remove(ref(database, `users/${uid}/expenses/${id}`))
    .then(() => {
      dispatch(removeExpense({ id }));
    })
    .catch(err => {
      console.log('Error removing an expense ', err);
    });
};

export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

export const startEditExpense = (id, updates) => (dispatch, getState) => {
  const uid = getState().auth.uid;

  return update(ref(database, `users/${uid}/expenses/${id}`), updates).then(() => {
    dispatch(editExpense(id, updates));
  });
};

export const setExpenses = expenses => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpense = () => (dispatch, getState) => {
  const uid = getState().auth.uid;

  return get(ref(database, `users/${uid}/expenses`)).then(snapshotVal => {
    const expenses = [];
    snapshotVal.forEach(snapshot => {
      expenses.push({
        id: snapshot.key,
        ...snapshot.val()
      });
    });

    dispatch(setExpenses(expenses));
  });
};
