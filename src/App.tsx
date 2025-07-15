import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { ToastContainer } from 'react-toastify';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/auth/LoginPage';
import ErrorPage from './pages/error/ErrorPage';
import AuthLayout from './layouts/AuthLayout';
import { ConfirmDialogProvider } from './context/ConfirmDialogContext';
import SaleIndex from './pages/sales/SaleIndex';
import SaleDetail from './pages/sales/SaleDetail';

const App = () => {
	return (
		<ConfirmDialogProvider>
			<Router>
				<ToastContainer />
				<Routes>
					<Route
						path="/"
						element={<Navigate to="/sales" replace />}
					/>
					<Route element={<AuthLayout />}>
						<Route path="/login" element={<LoginPage />} />
					</Route>
					<Route element={<MainLayout />}>
						<Route path="/sales" element={<SaleIndex />} />
						<Route path="/sales/:id" element={<SaleDetail />} />
					</Route>
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</Router>
		</ConfirmDialogProvider>
	);
};

export default App;
