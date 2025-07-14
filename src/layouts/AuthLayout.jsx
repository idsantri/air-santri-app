import { Navigate, Outlet } from 'react-router';
import ToggleMode from '../components/ToggleMode';
import config from '../config';
import LogoAvatar from './_components/LogoAvatar';
import InstallPwa from './_components/InstallPwa';
import useAuthStore from '../store/authStore';

const AuthLayout = () => {
	const { auth } = useAuthStore();
	if (auth.isAuthenticated) {
		return <Navigate to="/home" replace />;
	}

	return (
		<>
			<div className="min-h-screen p-4  flex items-center justify-center">
				<div className="max-w-sm w-full">
					<InstallPwa />
					<div className="card px-4 py-10 shadow-sm bg-base-200 rounded-md relative">
						{/* button mode */}
						<ToggleMode className="absolute top-2 right-2 hidden" />
						<header className="">
							<LogoAvatar className="" />
							<div className="text-center text-primary-content">
								<h1 className="mt-4 text-3xl">
									{config.APP_NAME}
								</h1>
								<p>
									<span className="font-medium text-xl">
										{config.INS_DESC}
									</span>
									<br />
									<span className=" font-bold text-lg">
										{config.INS_NAME}
									</span>
								</p>
							</div>
						</header>
						<main>
							<Outlet />
						</main>
					</div>
				</div>
			</div>
		</>
	);
};

export default AuthLayout;
