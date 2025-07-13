import DockMore from './DockMore';
import DockButton from './DockButton';

function DockNavigation({ clickLogout }) {
	return (
		<nav className="">
			<li className="dock bg-neutral text-neutral-content border-t-2 border-accent ">
				<DockButton
					iconName="solar:user-id-linear"
					to="/santri"
					label="Santri"
				/>
				<DockButton
					iconName="healthicons:i-training-class-24px"
					to="/madrasah"
					label="Madrasah"
				/>
				<DockButton
					iconName="entypo:home"
					to="/"
					label="Beranda"
					className="dock-active"
				/>
				<DockButton
					iconName="majesticons:creditcard-hand"
					to="/iuran"
					label="Iuran"
				/>
				<DockMore clickLogout={clickLogout} />
			</li>
		</nav>
	);
}

export default DockNavigation;
