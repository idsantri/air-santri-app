import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router';

function DockNavigation({
	label = 'Label',
	iconName = 'entypo:home',
	to = '/',
	className = '',
	disabled = false,
}) {
	const content = (
		<>
			<Icon className="w-full" icon={iconName} width="1.5em" />
			<span className="block pb-1 text-xs font-light text-center">
				{label}
			</span>
		</>
	);

	return (
		<li className={`${className}`}>
			{disabled ? (
				<div className="opacity-50 cursor-not-allowed">{content}</div>
			) : (
				<Link to={to}>{content}</Link>
			)}
		</li>
	);
}

export default DockNavigation;
