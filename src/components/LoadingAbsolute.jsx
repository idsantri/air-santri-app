const LoadingAbsolute = () => {
	return (
		<div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[1px] bg-base-100/25">
			<div className="loading loading-ring w-[100px]"></div>
		</div>
	);
};

export default LoadingAbsolute;
