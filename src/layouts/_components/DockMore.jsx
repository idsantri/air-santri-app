import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router';

function DockMore({ clickLogout }) {
	return (
		<div className="dropdown dropdown-top dropdown-end">
			<div tabIndex={0} role="button" className="">
				<Icon
					className="w-full"
					icon="basil:other-1-solid"
					width="1.5em"
				/>
				<span className="block pb-1 text-xs font-light text-center ">
					Lainnya
				</span>
			</div>
			<ul
				tabIndex={0}
				className="dropdown-content menu bg-neutral-700 text-neutral-content rounded-md z-[1] w-48 shadow-md p-0 mb-4 -mr-5"
			>
				<li className="p-2">
					<Link to="/profile" className="">
						<Icon icon="mdi:user" width="24" height="24" />
						Profil
					</Link>
				</li>

				<li className="p-2 bg-warning text-warning-content">
					<button
						onClick={clickLogout}
						className="cursor-pointer hover:cursor-pointer"
					>
						<Icon
							icon="bitcoin-icons:exit-filled"
							width="24"
							height="24"
						/>
						Keluar
					</button>
				</li>
			</ul>
		</div>
	);
}

export default DockMore;
