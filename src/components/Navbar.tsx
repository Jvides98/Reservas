import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { useAuth } from '../context/AuthContext';
import { Home, Calendar, LogIn, UserPlus, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <Menu mode="horizontal" className="px-4">
      <Menu.Item key="home" icon={<Home />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="events" icon={<Calendar />}>
        <Link to="/events">Events</Link>
      </Menu.Item>
      {isAuthenticated ? (
        <>
          <Menu.Item key="reservations">
            <Link to="/reservations">My Reservations</Link>
          </Menu.Item>
          {isAdmin && (
            <Menu.Item key="create-event">
              <Link to="/create-event">Create Event</Link>
            </Menu.Item>
          )}
          <Menu.Item key="logout" icon={<LogOut />} onClick={logout}>
            Logout
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="login" icon={<LogIn />}>
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="register" icon={<UserPlus />}>
            <Link to="/register">Register</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default Navbar;