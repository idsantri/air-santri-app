import useInput from '../../hooks/use-input';
import auth from '../../models/auth';
import { useState } from 'react';

function LoginPage() {
	const [login, onLoginChange] = useInput('');
	const [password, onPasswordChange] = useInput('');
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		await auth
			.login({
				login: login,
				password: password,
			})
			.then(() => {
				// window.location.href = '/';
				alert('Login berhasil!'); // Replace with a redirect or notification
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<>
			<h2 className="p-2 text-xl text-center text-slate-800 dark:text-slate-200">
				Login
			</h2>
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
