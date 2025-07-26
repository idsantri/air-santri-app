import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router';
import useAuthStore from '../../store/authStore';

function DockMore({ clickLogout, disabled }) {
	const roles = useAuthStore((state) => state.roles);
	const isAdmin =
		roles &&
		roles.length > 0 &&
		roles.some((role) => role.toLowerCase() == 'super admin');

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
					{disabled || !isAdmin ? (
						<div className="opacity-25 cursor-not-allowed ">
							<Icon icon="mdi:users" width="24" height="24" />
							Pengguna
						</div>
					) : (
						<Link to="/users">
							<Icon icon="mdi:users" width="24" height="24" />
							Pengguna
						</Link>
					)}
				</li>

				<li className="p-2">
					<Link to="/profile">
						<Icon icon="mdi:user" width="24" height="24" />
						Profil Saya
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
