import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import users from '../../models/users';
import FormActions from '../../components/FormActions';
import LoadingAbsolute from '../../components/LoadingAbsolute';

function UserChangePassword() {
	const { id } = useParams();
	const location = useLocation();
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

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

	const onSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		users
			.update(id, { password })
			.then(({ _user }) => {
				navigate(`/users/${id}`);
			})
			.catch((e) => console.log(e))
			.finally(() => setIsLoading(false));
	};

	return (
		<>
			<div className="card p-2 border border-base-200 rounded-sm">
				<header>
					<div className="rounded-sm p-2 bg-accent text-accent-content mb-2">
						<h2 className="text-xl">Ganti Password</h2>
						<p className="">
							{user?.name} ({user?.email})
						</p>
					</div>
				</header>
				<div className="border rounded-sm p-2 border-base-300/75">
					<form
						onSubmit={onSubmit}
						className="flex flex-col gap-4 mt-4 relative "
					>
						{isLoading && <LoadingAbsolute />}
						<label className="floating-label">
							<span>Password Baru</span>
							<input
								className="input w-full"
								type="text"
								name="address"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</label>
						<label className="label rounded-md border-[0.5px] border-base-content/20 text-base-content p-2">
							<input
								type="checkbox"
								className="toggle"
								checked
								readOnly
							/>
							User harus mengganti password saat login
						</label>
						<FormActions hideDelete hideReset />
					</form>
				</div>
			</div>
		</>
	);
}

export default UserChangePassword;
