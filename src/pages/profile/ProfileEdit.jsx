import { useState } from 'react';
import useAuthStore from '../../store/authStore';
import LoadingAbsolute from '../../components/LoadingAbsolute';
import FormActions from '../../components/FormActions';
import user from '../../models/user';
import useForm from '../../hooks/useForm';
import { useNavigate } from 'react-router';

function ProfileEdit() {
	const currentUser = useAuthStore((state) => state.user); // Ambil user langsung
	const setUser = useAuthStore((state) => state.setUser); // Ambil setUser

	const [isLoading, setIsLoading] = useState(false);
	const { formData, updateField, resetForm, pickFields } =
		useForm(currentUser);
	const navigate = useNavigate();

	const onSubmit = (e) => {
		e.preventDefault();
		const data = pickFields(['name', 'username', 'phone']);
		setIsLoading(true);
		user.update(data)
			.then(({ user: updatedUser }) => {
				setUser(updatedUser);
				navigate('/profile');
			})
			.catch((error) => {
				console.error('Error updating profile:', error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<>
			<header className="bg-base-200 p-4">
				<h2 className="text-xl">Edit Profil</h2>
				<p className="font-light">{currentUser.name}</p>
			</header>
			<div className="p-2 rounded-sm border-[0.5px] border-base-300 my-2">
				<form
					className="relative flex flex-col gap-4 mt-2"
					onSubmit={onSubmit}
				>
					{isLoading && <LoadingAbsolute />}
					<label className="floating-label">
						<span>Nama</span>
						<input
							type="text"
							className="input w-full"
							value={formData?.name ?? ''}
							onChange={(e) =>
								updateField('name', e.target.value)
							}
						/>
					</label>
					<label className="floating-label">
						<span>Email</span>
						<input
							type="text"
							className="input w-full"
							value={formData?.email ?? ''}
							disabled
						/>
						<p className="px-2 text-sm text-base-content/70">
							Hubungi Admin untuk mengubah email
						</p>
					</label>
					<label className="floating-label">
						<span>Username</span>
						<input
							type="text"
							className="input w-full"
							value={formData?.username ?? ''}
							onChange={(e) =>
								updateField('username', e.target.value)
							}
						/>
						<p className="px-2 text-sm text-base-content/70">
							Anda bisa login dengan email dan/atau username
						</p>
					</label>
					<label className="floating-label">
						<span>No. Telepon</span>
						<input
							type="text"
							className="input w-full validator tabular-nums"
							placeholder="081xxx"
							pattern="[0-9]*"
							minlength="11"
							maxlength="13"
							title="11-13 digit angka"
							value={formData?.phone ?? ''}
							onChange={(e) =>
								updateField('phone', e.target.value)
							}
						/>
						<p className="validator-hint px-2 text-sm  text-error-content">
							11-13 digit angka (081xxx) tanpa spasi atau simbol
						</p>
					</label>
					<FormActions hideDelete onReset={resetForm} />
				</form>
			</div>
			{/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
		</>
	);
}

export default ProfileEdit;
