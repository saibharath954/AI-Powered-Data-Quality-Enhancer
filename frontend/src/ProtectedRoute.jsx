import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

export default function ProtectedRoute({ children }) {
  const authenticated = localStorage.getItem("authenticated");
  if (authenticated === 'true') {
    return <>{children}</>;
  } else {
    return <Navigate to="/signin" />;
 }
}

ProtectedRoute.propTypes = {
    children: PropTypes.node, // Or PropTypes.element if it's always a single element
};