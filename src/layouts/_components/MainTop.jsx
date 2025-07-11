import ToggleMode from '../../components/ToggleMode';
import config from '../../config';
import LogoAvatar from './LogoAvatar';

function MainTop() {
	return (
		<div className="flex items-center justify-between gap-2 p-2 border-b shadow-md bg-gradient-to-b from-blue-800 to-blue-600 shadow-blue-400 border-blue-400">
			<div className="flex items-center gap-2">
				<a href="/" className="text-decoration-none block">
					<LogoAvatar className="w-16" />
				</a>
				<div>
					<h1
						className="p-0 m-0 text-blue-200"
						style={{
							fontSize: '1.15em',
							fontWeight: 400,
							lineHeight: '25px',
						}}
					>
						{config.APP_NAME}
					</h1>
					<p
						className="p-0 m-0 text-blue-100"
						style={{
							fontVariant: 'small-caps',
							fontSize: '1.25em',
							fontWeight: 300,
							lineHeight: '22px',
						}}
					>
						{config.INS_DESC}
					</p>
					<p
						className="p-0 m-0 text-blue-100"
						style={{
							fontSize: '1.1em',
							fontWeight: 400,
							lineHeight: '20px',
						}}
					>
						{config.INS_NAME}
					</p>
				</div>
			</div>
			{/* Button Mode */}
			<ToggleMode className="bg-blue-100 hidden" />
		</div>
	);
}

export default MainTop;
