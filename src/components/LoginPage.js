import { connect } from 'react-redux';

import { startLogin } from '../actions/auth';
import ThemeToggle from './ThemeToggle';

export const LoginPage = ({ startLogin }) => {
  return (
    <div className="box-layout">
      <ThemeToggle floating />
      <div className="box-layout__box">
        <div className="box-layout__center">
          <div className="box-layout__content">
            <div>
              <h1 className="box-layout__title">Budgetify</h1>
              <p>It's time to get your expenses under control.</p>
            </div>
            <p className="box-layout__divider"></p>
            <button
              className="button button__login"
              onClick={startLogin}
            >
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(null, mapDispatchToProps)(LoginPage);
