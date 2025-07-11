function LogoAvatar({ className }) {
	return (
		<div className={`flex items-center justify-center ${className}`}>
			<div>
				<div className="rounded-full overflow-hidden border-2 border-blue-700 flex items-center justify-center">
					<img
						className="w-full h-full object-cover"
						src="/icons/icon-128x128.png"
						alt="logo"
					/>
				</div>
			</div>
		</div>
	);
}

export default LogoAvatar;
