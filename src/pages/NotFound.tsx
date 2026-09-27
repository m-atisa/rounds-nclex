import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';

export function NotFound() {
  return (
    <div className="container empty">
      <Icon name="compass" />
      <h2>We couldn’t find that page</h2>
      <p>It may have moved. Let’s get you back on the unit.</p>
      <Link to="/" className="btn btn-primary">
        Go home
      </Link>
    </div>
  );
}
