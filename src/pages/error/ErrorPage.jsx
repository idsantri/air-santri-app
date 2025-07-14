import { useNavigate } from 'react-router';
import { Icon } from '@iconify/react/dist/iconify.js';

const ErrorPage = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className="flex items-center justify-center min-h-screen bg-error text-error-content">
				<div className="mx-auto text-center ">
					<p className="text-4xl font-bold ">Ups...</p>
					<h1 className="my-4 text-2xl font-light">
						Halaman tidak ditemukan!!!
					</h1>
					<div className="flex items-center justify-center mt-4">
						<button
							onClick={() => navigate(-1)}
							className="btn btn-neutral text-error"
						>
							<Icon icon="material-symbols:arrow-back-rounded" />
							Kembali
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
export default ErrorPage;
