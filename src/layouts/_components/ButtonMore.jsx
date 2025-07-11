import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';

function ButtonMore({ clickLogout }) {
	return (
		<>
			<li className="py-4 text-lg hover:bg-blue-900 dropdown dropdown-top dropdown-end">
				<div tabIndex={0} role="button" className="">
					<Icon
						className="w-full text-blue-100"
						icon="basil:other-1-solid"
						width="1.2em"
						height="1.2em"
					/>
					<span className="block pt-1 text-xs font-light text-center text-blue-200">
						Lainnya
					</span>
				</div>
				<ul
					tabIndex={0}
					className="dropdown-content menu bg-blue-200 rounded-md z-[1] w-48 p-1 shadow-md shadow-blue-400 mb-2 mr-2 text-blue-800"
				>
					<li className="">
						<Link to="/tatib" className="">
							<Icon icon="codicon:symbol-ruler" width="24" height="24" />
							Tata Tertib
						</Link>
					</li>
					<li className="">
						<Link to="/domisili" className="">
							<Icon icon="mdi:bed-outline" width="24" height="24" />
							Riwayat Domisili
						</Link>
					</li>
					<li className="">
						<button
							onClick={clickLogout}
							className="text-red-500 hover:bg-red-500 hover:text-red-100"
						>
							<Icon icon="bitcoin-icons:exit-filled" width="24" height="24" />
							Keluar
						</button>
					</li>
				</ul>
			</li>
		</>
	);
}

export default ButtonMore;
