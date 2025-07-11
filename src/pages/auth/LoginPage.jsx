import { Link } from 'react-router-dom';
import useInput from '../../hooks/use-input';
import InputField from '../../components/InputField';
import { ButtonNormal } from '../../components/Button';

function LoginPage() {
	const [email, onEmailChange] = useInput('');
	const [password, onPasswordChange] = useInput('');
	const isLoading = false; // Replace with actual loading state if needed

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(e);
	};

	return (
		<>
			<h2 className="p-2 text-xl text-center text-slate-800 dark:text-slate-200">Login</h2>
			<form onSubmit={onSubmit}>
				<InputField
					label="Pengguna"
					name="email"
					placeholder="Masukkan email Anda"
					type="email"
					value={email}
					onChange={onEmailChange}
					id="email"
					required
				/>
				<InputField
					label="Kata Sandi"
					name="password"
					placeholder="Masukkan kata sandi Anda"
					type="password"
					value={password}
					onChange={onPasswordChange}
					id="password"
					required
				/>
				<div className="flex items-center justify-between px-2">
					<ButtonNormal type="submit" disabled={isLoading}>
						{isLoading ? 'Memproses...' : 'Masuk'}
					</ButtonNormal>
					<p className="text-sm text-slate-900 dark:text-slate-200">
						Belum punya akun?{' '}
						<Link to={'/register'} className="underline" id="link-register">
							Daftar
						</Link>
					</p>
				</div>
			</form>
		</>
	);
}

export default LoginPage;
