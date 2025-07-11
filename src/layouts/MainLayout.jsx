import { Outlet } from 'react-router-dom';
import MainTop from './_components/MainTop';
import MainBottom from './_components/MainBottom';

const MainLayout = () => {
	return (
		<div className="min-h-screen bg-blue-50 text-blue-950 dark:bg-blue-950 dark:text-blue-200">
			<header className="fixed top-0 z-[1000] w-screen ">
				<MainTop />
			</header>
			<main className="pt-[86px] pb-[74px]">
				<div className="m-2">
					<Outlet />
				</div>
			</main>
			<footer className="fixed bottom-0 z-[1000] w-screen">
				<MainBottom />
			</footer>
		</div>
	);
};

export default MainLayout;
