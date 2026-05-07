import { Link } from 'react-router-dom';

import ThemeToggle from './ThemeToggle';

const HelpPage = () => {
  return (
    <div className="box-layout">
      <ThemeToggle floating />
      <div className="box-layout__box">
        <div className="box-layout__center">
          <div className="box-layout__content">
            <div>
              <h1 className="box-layout__title">Help</h1>
              <p>
                Track your spending, sort and filter by date or amount, and stay
                on top of your budget.
              </p>
            </div>
            <p className="box-layout__divider"></p>
            <Link className="button" to="/">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
