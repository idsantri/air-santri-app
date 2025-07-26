import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import LoadingFixed from '../../components/LoadingFixed';
import users from '../../models/users';

export default function UserIndex() {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		users
			.getAll()
			.then(({ users }) => setData(users))
			.catch((e) => console.error('Error fetching users:', e))
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<div>
			<header className="px-2 py-2 bg-base-300/50 flex items-center justify-between">
				<h2 className="tracking-wide text-xl">Data Pengguna</h2>
				<Link
					className="btn btn-accent rounded-sm"
					to={'/users/create'}
				>
					<Icon
						icon="material-symbols-light:add-rounded"
						width="1.5em"
					/>
					Tambah
				</Link>
			</header>
			{isLoading && <LoadingFixed />}
			<ul className="list bg-base-200/50 shadow-sm rounded-md mt-2">
				{data.length > 0 ? (
					data.map((user) => (
						<li
							className="list-row gap-2 bg-gradient-to-b from-base-300 to-base-200/10 rounded-none"
							key={user.id}
						>
							<div className="list-col-grow">
								<div className="text-xl">{user.name}</div>
								<div className="font-semibold opacity-80">
									{user.email} | {user.username}
								</div>
								<p className="">
									Akses:{' '}
									{user?.roles?.length > 0
										? user.roles.join('; ')
										: 'Tidak ada akses'}
								</p>
								<p className="text-sm italic opacity-65">
									{user?.warehouse_name
										? `${user.warehouse_name} (${user.warehouse_code})`
										: 'Tidak terhubung ke gudang'}
								</p>
							</div>

							<Link
								className="btn btn-circle btn-outline bg-accent/25"
								to={`/users/${user.id}`}
							>
								<Icon
									icon="entypo:info"
									width="20"
									height="20"
								/>
							</Link>
						</li>
					))
				) : (
					<li className="italic p-4 text-center">
						Tidak ada pengguna <br /> untuk untuk ditampilkan.
					</li>
				)}
			</ul>
		</div>
	);
}
