import React from 'react';
import { Link, useLocation } from 'react-router';

function TabRoute({ routes }) {
	const location = useLocation();
	return (
		<div className="mt-2">
			{/* Tab Navigation */}
			<div role="tablist" className="tabs tabs-border mb-1">
				{routes.map((route) => (
					<Link
						key={route.url}
						to={route.url}
						className={`tab ${location.pathname === route.url ? 'tab-active' : ''}`}
					>
						{route.icon && (
							<span className="mr-2">{route.icon}</span>
						)}
						{route.label}
					</Link>
				))}
			</div>
		</div>
	);
}

export default TabRoute;
