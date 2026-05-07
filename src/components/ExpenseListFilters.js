import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';

import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate
} from '../actions/filters';

const toDate = m => (m ? m.toDate() : null);
const toMoment = d => (d ? moment(d) : null);

const ExpenseListFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);

  const onDatesChange = ([start, end]) => {
    dispatch(setStartDate(toMoment(start)));
    dispatch(setEndDate(toMoment(end)));
  };

  const onTextChange = e => {
    dispatch(setTextFilter(e.target.value));
  };

  const onSortChange = e => {
    if (e.target.value === 'date') {
      dispatch(sortByDate());
    }
    if (e.target.value === 'amount') {
      dispatch(sortByAmount());
    }
  };

  return (
    <div className="content-container">
      <div className="input-group">
        <div className="input-group__item">
          <input
            className="text-inputs"
            type="text"
            value={filters.text}
            onChange={onTextChange}
            placeholder="Search Expenses"
          />
        </div>

        <div className="input-group__item">
          <select
            className="select"
            value={filters.sortBy}
            onChange={onSortChange}
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>

        <div className="input-group__item">
          <DatePicker
            selectsRange
            startDate={toDate(filters.startDate)}
            endDate={toDate(filters.endDate)}
            onChange={onDatesChange}
            isClearable
            dateFormat="MMM d, yyyy"
            placeholderText="Date range"
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseListFilters;
