import DockMore from './DockMore';
import DockButton from './DockButton';

function DockNavigation({ clickLogout }) {
	return (
		<nav className="">
			<ul className="dock bg-neutral text-neutral-content border-t-2 border-accent ">
				<DockButton
					iconName="solar:user-id-linear"
					to="/santri"
					label="Pelanggan"
				/>
				<DockButton
					iconName="healthicons:i-training-class-24px"
					to="/madrasah"
					label="Stok"
				/>
				<DockButton
					iconName="f7:cart-badge-plus"
					to="/sales"
					label="Penjualan"
					className="dock-active"
				/>
				<DockButton
					iconName="majesticons:creditcard-hand"
					to="/iuran"
					label="Produk"
				/>
				<DockMore clickLogout={clickLogout} />
			</ul>
		</nav>
	);
}

export default DockNavigation;
