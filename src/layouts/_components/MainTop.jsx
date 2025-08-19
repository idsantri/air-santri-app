import ToggleMode from '../../components/ToggleMode';
import LogoAvatar from './LogoAvatar';

function MainTop() {
	const env = import.meta.env;
	// console.log(env);
	return (
		<div className="shadow-md bg-success text-success-content">
			<div className="container mx-auto py-2 px-2 ">
				<div className="flex items-center justify-between gap-2 ">
					<div className="flex items-center gap-2">
						<a href="/" className="text-decoration-none block">
							<LogoAvatar className="w-16" />
						</a>
						<div>
							<h1
								className="p-0 m-0 "
								style={{
									fontSize: '1.15em',
									fontWeight: 400,
									lineHeight: '25px',
								}}
							>
								Aplikasi
							</h1>
							<p
								className="p-0 m-0 small-caps "
								style={{
									fontVariant: 'small-caps',
									fontSize: '1.25em',
									fontWeight: 300,
									lineHeight: '22px',
								}}
							>
								{env.VITE_APP_LONG_NAME}
							</p>
							<p className="p-0 m-0 tracking-widest font-light">
								{env.VITE_APP_INSTANCE}
							</p>
						</div>
					</div>
					{/* Button Mode */}
					<ToggleMode className="" />
				</div>
			</div>
		</div>
	);
}

export default MainTop;
