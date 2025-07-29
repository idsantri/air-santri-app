import DockMore from './DockMore';
import DockButton from './DockButton';
import { useLocation } from 'react-router';

function DockNavigation({ clickLogout, disabled }) {
	// console.log('DockNavigation render', disable);
	const location = useLocation();
	const currentPath = location.pathname;

	const isActiveForPath = (targetPath) => {
		if (currentPath === targetPath) return true;
		if (targetPath !== '/' && currentPath.startsWith(targetPath + '/'))
			return true;
		return false;
	};

	const anyActive =
		isActiveForPath('/reports') ||
		isActiveForPath('/stocks') ||
		isActiveForPath('/sales') ||
		isActiveForPath('/customers');

	return (
		<nav className="">
			<ul className="dock bg-neutral text-neutral-content border-t-2 border-accent ">
				<DockButton
					iconName="carbon:report"
					to="/reports"
					label="Laporan"
					className={isActiveForPath('/reports') ? 'dock-active' : ''}
					disabled
				/>
				<DockButton
					iconName="healthicons:stock-out"
					to="/stocks"
					label="Stok"
					className={isActiveForPath('/stocks') ? 'dock-active' : ''}
					disabled={disabled}
				/>
				<DockButton
					iconName="iconoir:home-sale"
					to="/sales"
					label="Transaksi"
					className={isActiveForPath('/sales') ? 'dock-active' : ''}
					disabled={disabled}
				/>
				<DockButton
					iconName="solar:user-id-linear"
					to="/customers"
					label="Pelanggan"
					className={
						isActiveForPath('/customers') ? 'dock-active' : ''
					}
					disabled={disabled}
				/>
				<li className={!anyActive ? 'dock-active' : ''}>
					<DockMore clickLogout={clickLogout} disabled={disabled} />
				</li>
			</ul>
		</nav>
	);
}

export default DockNavigation;
