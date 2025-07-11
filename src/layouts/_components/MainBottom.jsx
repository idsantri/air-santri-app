import useConfirmDialog from '../../hooks/use-confirm-dialog';
import useAuthStore from '../../store/authStore';
import ButtonMore from './ButtonMore';
import ButtonNavigation from './ButtonNavigation';

function BottomNavigation() {
	const { logout } = useAuthStore();
	const dialog = useConfirmDialog();
	async function handleLogout() {
		const isConfirmed = await dialog({
			title: 'Logout?',
			message: 'Keluar dari Aplikasi?',
		});
		if (!isConfirmed) return;
		logout();
	}

	return (
		<nav className="border-t bg-gradient-to-t from-blue-800 to-blue-700 shadow-sm-top shadow-blue-400 border-blue-400">
			<ul className="grid grid-flow-col auto-cols-fr">
				<ButtonNavigation
					iconName="solar:user-id-linear"
					to="/santri"
					label="Santri"
				/>
				<ButtonNavigation
					iconName="healthicons:i-training-class-24px"
					to="/madrasah"
					label="Madrasah"
				/>
				<ButtonNavigation
					iconName="entypo:home"
					to="/"
					label="Beranda"
				/>
				<ButtonNavigation
					iconName="majesticons:creditcard-hand"
					to="/iuran"
					label="Iuran"
				/>
				<ButtonMore clickLogout={handleLogout} />
			</ul>
		</nav>
	);
}

export default BottomNavigation;
