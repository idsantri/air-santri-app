function LogoAvatar({ className }) {
	return (
		<div className={`flex items-center justify-center ${className}`}>
			<div className="border-base-content border-2 rounded-full overflow-hidden">
				<img
					className="object-fit-cover scale-115"
					src="/icons/icon-128x128.png"
					alt="logo"
				/>
			</div>
		</div>
	);
}

export default LogoAvatar;
