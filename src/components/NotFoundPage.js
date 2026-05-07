import { Link } from 'react-router-dom';

import ThemeToggle from './ThemeToggle';

const NotFoundPage = () => {
  return (
    <div className="box-layout">
      <ThemeToggle floating />
      <div className="box-layout__box">
        <div className="box-layout__center">
          <div className="box-layout__content">
            <div>
              <h1 className="box-layout__title">404</h1>
              <p>The page you're looking for has wandered off.</p>
            </div>
            <p className="box-layout__divider"></p>
            <Link className="button" to="/">
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
