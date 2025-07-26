import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import LoadingFixed from '../../components/LoadingFixed';
import UserForm from './UserForm';
import users from '../../models/users';

function UserEdit() {
	const { id } = useParams();
	const location = useLocation();
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (
			location.state &&
			location.state.user &&
			location?.state?.user?.id == id
		) {
			// Data ada dari navigasi
			setUser(location.state.user);
			setIsLoading(false);
			// console.log('Data loaded from navigation state!');
		} else {
			// console.log('No data in state, fetching from server...');
			setIsLoading(true);
			users
				.getById(id)
				.then(({ user }) => {
					// console.log(sale);
					setUser(user);
				})
				.catch((e) => console.log(e))
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [location.state, id]);

	return (
		<>
			<div className="card p-2 border border-base-200 rounded-sm">
				<header>
					<div className="flex items-center justify-between rounded-sm p-2 bg-accent text-accent-content mb-2">
						<h2 className="text-xl">Formulir User</h2>
						<p className="badge badge-info">Edit</p>
					</div>
				</header>
				{isLoading && <LoadingFixed>Memuat data…</LoadingFixed>}
				<UserForm inputData={user} />
			</div>
		</>
	);
}

export default UserEdit;
