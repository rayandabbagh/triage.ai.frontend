import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
	const { authState } = useContext(AuthContext);

	if (!authState.isAuth) {
		return <Navigate to="/login" />;
	}

	return children;
};

export default ProtectedRoute;
