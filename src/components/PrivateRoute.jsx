
import { Navigate } from 'react-router-dom';
export const PrivateRoute = ({
       children,
  }) => {
    const authenticated = localStorage.getItem('token');;
    if (!authenticated) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  };