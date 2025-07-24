import React, { useState } from 'react';
import useInput from '../../hooks/useInput';
import useAuthStore from '../../store/authStore';
import { Icon } from '@iconify/react';
import LoadingAbsolute from '../../components/LoadingAbsolute';
import FormActions from '../../components/FormActions';
import auth from '../../models/auth';
import user from '../../models/user';

function ProfileResetPassword() {
	const store = useAuthStore();
	const [password_current, onCurrent] = useInput('');
	const [password, onPassword] = useInput('');
	const [password_confirmation, onConfirmation] = useInput('');
	const [showCurrent, setShowCurrent] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		const data = { password_current, password, password_confirmation };
		user.resetPassword(data)
			.then(({ _ }) => {
				auth.logout().finally(() => {
					store.logout();
				});
			})
			.catch((error) => {
				console.error('Error resetting password:', error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<>
			<header className="bg-base-200 p-4">
				<h2 className="text-xl">Ganti Password</h2>
				<p className="font-light">{store.auth.user.name}</p>
			</header>
			<div className="p-2 rounded-sm border-[0.5px] border-base-300 my-2">
				<form className="relative" onSubmit={onSubmit}>
					{isLoading && <LoadingAbsolute />}
					<label className="floating-label mb-4">
						<span>Password Lama</span>
						<div className="join w-full">
							<input
								type={showCurrent ? 'text' : 'password'}
								placeholder="Kata sandi lama"
								className="input input-md w-full join-item"
								value={password_current}
								onChange={onCurrent}
								required
							/>
							<button
								type="button"
								className="btn join-item"
								onClick={() => setShowCurrent(!showCurrent)}
							>
								<Icon
									icon={
										showCurrent ? 'mdi:eye-off' : 'mdi:eye'
									}
									width="1.2em"
								/>
							</button>
						</div>
					</label>
					<label className="floating-label my-4">
						<span>Password Baru</span>
						<div className="join w-full">
							<input
								type={showPassword ? 'text' : 'password'}
								placeholder="Kata sandi baru"
								className="input input-md w-full join-item"
								value={password}
								onChange={onPassword}
								required
							/>
							<button
								type="button"
								className="btn join-item"
								onClick={() => setShowPassword(!showPassword)}
							>
								<Icon
									icon={
										showPassword ? 'mdi:eye-off' : 'mdi:eye'
									}
									width="1.2em"
								/>
							</button>
						</div>
					</label>
					<label className="floating-label my-4">
						<span>Password Konfirmasi</span>
						<div className="join w-full">
							<input
								type={showConfirm ? 'text' : 'password'}
								placeholder="Tulis ulang kata sandi baru"
								className="input input-md w-full join-item"
								value={password_confirmation}
								onChange={onConfirmation}
								required
							/>
							<button
								type="button"
								className="btn join-item"
								onClick={() => setShowConfirm(!showConfirm)}
							>
								<Icon
									icon={
										showConfirm ? 'mdi:eye-off' : 'mdi:eye'
									}
									width="1.2em"
								/>
							</button>
						</div>
					</label>
					<FormActions hideDelete hideReset />
				</form>
			</div>
		</>
	);
}

export default ProfileResetPassword;
