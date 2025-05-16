import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

// PrivateRoute component for React Router v6
const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useAuth(); // Access user from context

  // Return the route element if user is logged in, otherwise redirect to login
  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
