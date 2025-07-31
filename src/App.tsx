import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { ConfirmDialogProvider } from './context/ConfirmDialogContext';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/auth/LoginPage';
import ErrorPage from './pages/error/ErrorPage';
import AuthLayout from './layouts/AuthLayout';
import SaleIndex from './pages/sales/SaleIndex';
import SaleDetail from './pages/sales/SaleDetail';
import SaleCreate from './pages/sales/SaleCreate';
import SaleEdit from './pages/sales/SaleEdit';
import SaleDetailCreate from './pages/sale-details/SaleDetailCreate';
import SalePaymentCreate from './pages/sale-payments/SalePaymentCreate';
import ProductIndex from './pages/products/ProductIndex';
import ProductCreate from './pages/products/ProductCreate';
import ProductEdit from './pages/products/ProductEdit';
import CustomerIndex from './pages/customers/CustomerIndex';
import CustomerDetail from './pages/customers/CustomerDetail';
import CustomerCreate from './pages/customers/CustomerCreate';
import CustomerEdit from './pages/customers/CustomerEdit';
import ProfileIndex from './pages/profile/ProfileIndex';
import StockIndex from './pages/stocks/StockIndex';
import StockCreate from './pages/stocks/StockCreate';
import StockEdit from './pages/stocks/StockEdit';
import ProfileEdit from './pages/profile/ProfileEdit';
import ProfileResetPassword from './pages/profile/ProfileResetPassword';
import UserIndex from './pages/users/UserIndex';
import UserDetail from './pages/users/UserDetail';
import UserCreate from './pages/users/UserCreate';
import UserEdit from './pages/users/UserEdit';
import UserChangePassword from './pages/users/UserChangePassword';
import WarehouseIndex from './pages/warehouses/WarehouseIndex';
import WarehouseCreate from './pages/warehouses/WarehouseCreate';
import WarehouseEdit from './pages/warehouses/WarehouseEdit';
import SaleTransaction from './pages/sales/transaction/SaleTransaction';

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
						{/* sales */}
						<Route path="/sales" element={<SaleIndex />} />
						<Route path="/sales/create" element={<SaleCreate />} />
						<Route
							path="/sales/transaction"
							element={<SaleTransaction />}
						/>
						<Route path="/sales/:id" element={<SaleDetail />} />
						<Route path="/sales/:id/edit" element={<SaleEdit />} />

						<Route
							path="/sales/:sale_id/details/create"
							element={<SaleDetailCreate />}
						/>
						<Route
							path="/sales/:sale_id/payments/create"
							element={<SalePaymentCreate />}
						/>

						{/* products */}
						<Route path="/products" element={<ProductIndex />} />
						<Route
							path="/products/create"
							element={<ProductCreate />}
						/>
						<Route
							path="/products/:id/edit"
							element={<ProductEdit />}
						/>

						{/* customers */}
						<Route path="/customers" element={<CustomerIndex />} />
						<Route
							path="/customers/create"
							element={<CustomerCreate />}
						/>
						<Route
							path="/customers/:id"
							element={<CustomerDetail />}
						/>
						<Route
							path="/customers/:id/edit"
							element={<CustomerEdit />}
						/>

						{/* stock */}
						<Route path="/stocks" element={<StockIndex />} />
						<Route
							path="/stocks/create"
							element={<StockCreate />}
						/>
						<Route
							path="/stocks/:id/edit"
							element={<StockEdit />}
						/>

						{/* profile */}
						<Route path="/profile" element={<ProfileIndex />} />
						<Route path="/profile/edit" element={<ProfileEdit />} />
						<Route
							path="/profile/reset-password"
							element={<ProfileResetPassword />}
						/>

						{/* users */}
						<Route path="/users" element={<UserIndex />} />
						<Route path="/users/create" element={<UserCreate />} />
						<Route path="/users/:id" element={<UserDetail />} />
						<Route path="/users/:id/edit" element={<UserEdit />} />
						<Route
							path="/users/:id/change-password"
							element={<UserChangePassword />}
						/>

						{/* warehouses */}
						<Route
							path="/warehouses"
							element={<WarehouseIndex />}
						/>
						<Route
							path="/warehouses/create"
							element={<WarehouseCreate />}
						/>
						<Route
							path="/warehouses/:id/edit"
							element={<WarehouseEdit />}
						/>
					</Route>

					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</Router>
		</ConfirmDialogProvider>
	);
};

export default App;
