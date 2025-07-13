function LogoAvatar({ className }) {
	return (
		<div className={`flex items-center justify-center ${className}`}>
			<div>
				<div className="avatar">
					<img
						className="w-full h-full rounded-full border-secondary-content border-2"
						src="/icons/icon-128x128.png"
						alt="logo"
					/>
				</div>
			</div>
		</div>
	);
}

export default LogoAvatar;
