import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { ConfirmDialogProvider } from './context/ConfirmDialogContext';
import './utils/rupiah';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/auth/LoginPage';
import ErrorPage from './pages/error/ErrorPage';
import AuthLayout from './layouts/AuthLayout';
import SaleIndex from './pages/sales/SaleIndex';
import SaleDetail from './pages/sales/SaleDetail';
import SaleCreate from './pages/sales/SaleCreate';
import SaleEdit from './pages/sales/SaleEdit';

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
						<Route path="/sales/create" element={<SaleCreate />} />
						<Route path="/sales/:id" element={<SaleDetail />} />
						<Route path="/sales/:id/edit" element={<SaleEdit />} />
					</Route>
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</Router>
		</ConfirmDialogProvider>
	);
};

export default App;
