import { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';

export class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      error: ''
    };
  }

  onDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };

  onNoteChange = e => {
    this.setState({ note: e.target.value });
  };

  onAmountChange = e => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({ amount });
    }
  };

  onDateChange = date => {
    if (date) {
      this.setState({ createdAt: moment(date) });
    }
  };

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState({ error: 'Please provide description and amount' });
    } else {
      this.setState({ error: '' });
      this.props.onSubmit({
        description: this.state.description,
        note: this.state.note,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf()
      });
    }
  };

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}

        <input
          className="text-inputs"
          type="text"
          placeholder="Description"
          value={this.state.description}
          onChange={this.onDescriptionChange}
          autoFocus
        />
        <input
          className="text-inputs"
          type="text"
          placeholder="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <DatePicker
          selected={this.state.createdAt.toDate()}
          onChange={this.onDateChange}
          dateFormat="MMMM d, yyyy"
        />

        <textarea
          placeholder="Add a note for your expense (optional)"
          value={this.state.note}
          onChange={this.onNoteChange}
          className="textarea"
        ></textarea>

        <div>
          <button className="button">Save Expense</button>
        </div>
      </form>
    );
  }
}

export default ExpenseForm;
