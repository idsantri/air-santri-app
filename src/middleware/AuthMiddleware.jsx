import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const AuthMiddleware = ({ children }) => {
	const { isAuthenticated } = useAuthStore.getState().auth;
	return isAuthenticated ? children : <Navigate to="/login" />;
};

export default AuthMiddleware;
