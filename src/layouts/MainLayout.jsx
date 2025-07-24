import { Navigate, Outlet, useLocation } from 'react-router';
import MainTop from './_components/MainTop';
import DockNavigation from './_components/DockNavigation';
import useAuthStore from '../store/authStore';
import useConfirmDialog from '../hooks/useConfirmDialog';
import auth from '../models/auth';
import { useState } from 'react';
import LoadingFixed from '../components/LoadingFixed';

const MainLayout = () => {
	const dialog = useConfirmDialog();
	const location = useLocation();
	const loggedIn = useAuthStore((state) => state.isLoggedIn());
	const logout = useAuthStore((state) => state.logout);
	const user = useAuthStore((state) => state.user);
	const [isLoading, setIsLoading] = useState(false);

	if (!loggedIn) {
		return <Navigate to="/login" replace />;
	}

	if (
		user?.must_change_password &&
		!location.pathname.startsWith('/profile')
	) {
		return <Navigate to="/profile" replace />;
	}

	async function handleLogout() {
		const isConfirmed = await dialog({
			title: 'Logout?',
			message: 'Keluar dari Aplikasi?',
		});
		if (!isConfirmed) return;
		setIsLoading(true);
		await auth.logout().finally(() => {
			logout();
			setIsLoading(false);
		});
	}

	return (
		<div className="min-h-screen bg-base-100">
			<header className="fixed top-0 z-[1000] w-screen ">
				<MainTop />
			</header>
			<main className="pt-[86px] pb-[74px]">
				<div className="container mx-auto p-2">
					{isLoading && <LoadingFixed>Proses logout …</LoadingFixed>}
					<Outlet />
				</div>
			</main>
			<footer className="fixed bottom-0 z-[1000] w-screen">
				<DockNavigation
					clickLogout={handleLogout}
					disabled={user?.must_change_password}
				/>
			</footer>
		</div>
	);
};

export default MainLayout;
