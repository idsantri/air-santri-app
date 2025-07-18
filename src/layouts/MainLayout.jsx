import { Navigate, Outlet } from 'react-router';
import MainTop from './_components/MainTop';
import DockNavigation from './_components/DockNavigation';
import useAuthStore from '../store/authStore';
import useConfirmDialog from '../hooks/useConfirmDialog';
import auth from '../models/auth';

const MainLayout = () => {
	const store = useAuthStore();
	const dialog = useConfirmDialog();

	if (!store.auth.isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	async function handleLogout() {
		const isConfirmed = await dialog({
			title: 'Logout?',
			message: 'Keluar dari Aplikasi?',
		});
		if (!isConfirmed) return;

		await auth.logout().finally(() => {
			store.logout();
		});
	}

	return (
		<div className="min-h-screen bg-base-100">
			<header className="fixed top-0 z-[1000] w-screen ">
				<MainTop />
			</header>
			<main className="pt-[86px] pb-[74px]">
				<div className="container mx-auto p-2">
					{/* Main content goes here */}
					<Outlet />
				</div>
			</main>
			<footer className="fixed bottom-0 z-[1000] w-screen">
				<DockNavigation clickLogout={handleLogout} />
			</footer>
		</div>
	);
};

export default MainLayout;
