import database from '../firebase/firebase';

// Add expense action
export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => dispatch => {
  const {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
  } = expenseData;

  const expense = { description, note, amount, createdAt };

  return database
    .ref('expenses')
    .push(expense)
    .then(ref => {
      dispatch(
        addExpense({
          id: ref.key,
          ...expense
        })
      );
    });
};

// Add expense action
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// SET EXPENSES
export const setExpenses = expenses => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpense = () => dispatch => {
  return database
    .ref('expenses')
    .once('value')
    .then(snapshotVal => {
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
