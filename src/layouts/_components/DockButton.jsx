import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router';

function DockNavigation({
	label = 'Label',
	iconName = 'entypo:home',
	to = '/',
	className = '',
}) {
	return (
		<li className={`${className}`}>
			<Link to={to} className="text-lg">
				<Icon
					className="w-full"
					icon={iconName}
					width="1.2em"
					height="1.2em"
				/>
				<span className="block pb-1 text-xs font-light text-center ">
					{label}
				</span>
			</Link>
		</li>
	);
}

export default DockNavigation;
