import useInput from '../../hooks/useInput';
import { useState } from 'react';
import useAuthStore from '../../store/authStore';
import auth from '../../models/auth';
import LoadingAbsolute from '../../components/LoadingAbsolute';

function LoginPage() {
	const [login, onLoginChange] = useInput('');
	const [password, onPasswordChange] = useInput('');
	const [isLoading, setIsLoading] = useState(false);
	const store = useAuthStore();

	const onSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		auth.setNotify(true);
		auth.login({
			login: login,
			password: password,
		})
			.then((res) => {
				store.login(res);
			})
			.catch((error) => {
				console.error('Login failed:', error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<>
			{isLoading && <LoadingAbsolute />}
			<h2 className="p-2 text-xl text-center text-base-content">Login</h2>
			<form onSubmit={onSubmit}>
				<label className="floating-label ">
					<span>Login</span>
					<input
						type="text"
						placeholder="username/email"
						className="input input-md w-full"
						value={login}
						onChange={onLoginChange}
						required
					/>
				</label>
				<label className="floating-label mt-4">
					<span>Password</span>
					<input
						type="password"
						placeholder="Kata sandi"
						className="input input-md w-full"
						value={password}
						onChange={onPasswordChange}
						required
					/>
				</label>
				<button
					className="btn btn-outline w-full mt-4"
					type="submit"
					disabled={isLoading}
				>
					{isLoading ? 'Memproses...' : 'Masuk'}
				</button>
			</form>
		</>
	);
}

export default LoginPage;
