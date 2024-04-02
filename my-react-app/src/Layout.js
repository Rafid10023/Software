// Layout.js
import { Outlet, Link, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  // Check if the current location matches the home route ("/")
  const isHome = location.pathname === '/';

  // If it's the home route, render the layout
  if (isHome) {
    return (
      <>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/system-admin">System Admin</Link>
            </li>
            <li>
              <Link to="/user-management">User Management</Link>
            </li>
            <li>
              <Link to="/reminders">Reminders</Link>
            </li>
            <li>
              <Link to="/rnr">Reviews & Ratings</Link>
            </li>
          </ul>
        </nav>

        <Outlet />
      </>
    );
  } else {
    // If it's not the home route, render only the Outlet
    return <Outlet />;
  }
};

export default Layout;
