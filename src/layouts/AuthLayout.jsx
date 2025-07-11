import { Outlet } from 'react-router-dom';
import ToggleMode from '../components/ToggleMode';
import config from '../config';
import LogoAvatar from './_components/LogoAvatar';
import InstallPwa from './_components/InstallPwa';

const AuthLayout = () => {
	return (
		<>
			<div className="grid min-h-screen p-4 bg-blue-50 text-blue-950 place-content-center">
				<div className="max-w-sm text-center">
					<InstallPwa className="mb-4" />
					<div className="px-4 py-10 rounded-md shadow-md bg-blue-200 shadow-blue-500 relative">
						{/* button mode */}
						<ToggleMode className="absolute top-2 right-2 hidden" />
						<header className="">
							<LogoAvatar className="" />
							<div className="">
								<h1
									style={{ fontSize: '1.6em' }}
									className="mt-4 font-medium text-blue-700"
								>
									{config.APP_NAME}
								</h1>
								<p>
									<span
										style={{ fontSize: '1.2em' }}
										className="font-medium text-blue-800"
									>
										{config.INS_DESC}
									</span>
									<br />
									<span
										style={{
											fontVariant: 'small-caps',
											fontSize: '1.5em',
										}}
										className="text-blue-900"
									>
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
