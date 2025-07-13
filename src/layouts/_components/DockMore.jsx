import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';

function DockMore({ clickLogout }) {
	return (
		<>
			<li className="text-lg pt-1.5 dropdown dropdown-top dropdown-end">
				<div tabIndex={0} role="button" className="">
					<Icon
						className="w-full"
						icon="basil:other-1-solid"
						width="1.2em"
						height="1.2em"
					/>
					<span className="block pb-1 text-xs font-light text-center ">
						Lainnya
					</span>
				</div>
				<ul
					tabIndex={0}
					className="dropdown-content menu bg-warning text-primary-content rounded-md z-[1] w-48 p-1 shadow-md  mb-2 mr-2 "
				>
					<li className="">
						<Link to="/tatib" className="">
							<Icon
								icon="codicon:symbol-ruler"
								width="24"
								height="24"
							/>
							Tata Tertib
						</Link>
					</li>
					<li className="">
						<Link to="/domisili" className="">
							<Icon
								icon="mdi:bed-outline"
								width="24"
								height="24"
							/>
							Riwayat Domisili
						</Link>
					</li>
					<li className="">
						<button
							onClick={clickLogout}
							className="text-error-content hover:bg-error hover:text-neutral"
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
			</li>
		</>
	);
}

export default DockMore;
