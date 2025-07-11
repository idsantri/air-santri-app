import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/auth/LoginPage';
import Home from './pages/home/Index';
import ErrorPage from './pages/error/ErrorPage';
import AuthLayout from './layouts/AuthLayout';
import AuthMiddleware from './middleware/AuthMiddleware';

const App = () => {
	return (
		<Router>
			<ToastContainer />
			<Routes>
				<Route path="/" element={<Navigate to="/home" replace />} />
				<Route element={<AuthLayout />}>
					<Route path="/login" element={<LoginPage />} />
				</Route>
				<Route
					element={
						<AuthMiddleware>
							<MainLayout />
						</AuthMiddleware>
					}
				>
					<Route path="/home" element={<Home />} />
				</Route>
				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</Router>
	);
};

export default App;
