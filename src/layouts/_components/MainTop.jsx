import ToggleMode from '../../components/ToggleMode';
import config from '../../config';
import LogoAvatar from './LogoAvatar';

function MainTop() {
	return (
		<div className="flex items-center justify-between gap-2 py-2 px-4 shadow-md bg-success text-success-content">
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
						className="p-0 m-0 "
						style={{
							fontVariant: 'small-caps',
							fontSize: '1.25em',
							fontWeight: 300,
							lineHeight: '22px',
						}}
					>
						{config.APP_LONG_NAME}
					</p>
					<p
						className="p-0 m-0 "
						style={{
							fontSize: '1.1em',
							fontWeight: 400,
							lineHeight: '20px',
						}}
					>
						{config.APP_INSTANCE}
					</p>
				</div>
			</div>
			{/* Button Mode */}
			<ToggleMode className="" />
		</div>
	);
}

export default MainTop;
