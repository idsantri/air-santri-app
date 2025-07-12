import { Navigate, Outlet } from 'react-router-dom';
import MainTop from './_components/MainTop';
import MainBottom from './_components/MainBottom';
import useAuthStore from '../store/authStore';
import useConfirmDialog from '../hooks/use-confirm-dialog';
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
		<div className="min-h-screen bg-blue-50 text-blue-950 dark:bg-blue-950 dark:text-blue-200">
			<header className="fixed top-0 z-[1000] w-screen ">
				<MainTop />
			</header>
			<main className="pt-[86px] pb-[74px]">
				<div className="m-2">
					<Outlet />
				</div>
			</main>
			<footer className="fixed bottom-0 z-[1000] w-screen">
				<MainBottom clickLogout={handleLogout} />
			</footer>
		</div>
	);
};

export default MainLayout;
