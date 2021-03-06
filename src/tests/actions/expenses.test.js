import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  addExpense,
  editExpense,
  removeExpense,
  startAddExpense,
  setExpenses,
  startSetExpense,
  startRemoveExpense,
  startEditExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const uid = 'dummytestid';
const defaultAuthState = { auth: { uid } };

beforeEach(done => {
  const expenseData = {};

  expenses.forEach(({ id, description, amount, note, createdAt }) => {
    expenseData[id] = { id, description, amount, note, createdAt };
  });
  database
    .ref(`users/${uid}/expenses`)
    .set(expenseData)
    .then(() => done());
});

test('Should setup remove expense action object', () => {
  const removeExpenseResult = removeExpense({ id: '163test' });

  expect(removeExpenseResult).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '163test'
  });
});

test('Should remove an expense from firebase', done => {
  const store = mockStore(defaultAuthState);

  store
    .dispatch(startRemoveExpense({ id: expenses[1].id }))
    .then(done => {
      const actions = store.getActions();
      const id = expenses[1].id;

      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id
      });

      return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test('Should setup edit expense action object', () => {
  const editExpenseResult = editExpense('4687', { note: 'New note' });

  expect(editExpenseResult).toEqual({
    type: 'EDIT_EXPENSE',
    id: '4687',
    updates: { note: 'New note' }
  });
});

test('Should edit expense from firebase', done => {
  const store = mockStore(defaultAuthState);
  const id = expenses[2].id;
  const updates = { description: 'Test description', note: 'Test note' };

  store
    .dispatch(startEditExpense(id, { ...updates }))
    .then(done => {
      const actions = store.getActions();

      expect(actions[0]).toEqual({
        type: 'EDIT_EXPENSE',
        id,
        updates
      });
      return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual({ ...expenses[2], ...updates });
      done();
    });
});

test('Should setup add expense action object with provided values', () => {
  const addExpenseAction = addExpense(expenses[2]);

  expect(addExpenseAction).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

test('Should add expense to database and store', done => {
  const store = mockStore(defaultAuthState);
  const expenseData = {
    description: 'IPhone',
    note: '',
    amount: 86000,
    createdAt: 3000
  };
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();

      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });

      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData);

      done();
    });
});

test('Should add expense with defaults to database and store', done => {
  const store = mockStore(defaultAuthState);
  const expenseDefaults = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  };
  store
    .dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions();

      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseDefaults
        }
      });

      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseDefaults);

      done();
    });
});

test('Shuold setup set expense action object with data', () => {
  const action = setExpenses(expenses);

  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('Should fetch expenses from frirebase', done => {
  const store = mockStore(defaultAuthState);

  store.dispatch(startSetExpense()).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});
