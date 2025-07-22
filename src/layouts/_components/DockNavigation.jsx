import DockMore from './DockMore';
import DockButton from './DockButton';
import { useLocation } from 'react-router';

function DockNavigation({ clickLogout }) {
	const location = useLocation();
	const currentPath = location.pathname;

	const isActiveForPath = (targetPath) => {
		if (currentPath === targetPath) return true;
		if (targetPath !== '/' && currentPath.startsWith(targetPath + '/'))
			return true;
		return false;
	};

	const anyActive =
		isActiveForPath('/products') ||
		isActiveForPath('/stocks') ||
		isActiveForPath('/sales') ||
		isActiveForPath('/customers');

	return (
		<nav className="">
			<ul className="dock bg-neutral text-neutral-content border-t-2 border-accent ">
				<DockButton
					iconName="gridicons:product"
					to="/products"
					label="Produk"
					className={
						isActiveForPath('/products') ? 'dock-active' : ''
					}
				/>
				<DockButton
					iconName="healthicons:stock-out"
					to="/stocks"
					label="Stok"
					className={isActiveForPath('/stocks') ? 'dock-active' : ''}
				/>
				<DockButton
					iconName="iconoir:home-sale"
					to="/sales"
					label="Penjualan"
					className={isActiveForPath('/sales') ? 'dock-active' : ''}
				/>
				<DockButton
					iconName="solar:user-id-linear"
					to="/customers"
					label="Pelanggan"
					className={
						isActiveForPath('/customers') ? 'dock-active' : ''
					}
				/>
				<li className={!anyActive ? 'dock-active' : ''}>
					<DockMore clickLogout={clickLogout} />
				</li>
			</ul>
		</nav>
	);
}

export default DockNavigation;
