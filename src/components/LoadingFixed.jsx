const LoadingFixed = ({ children = '' }) => {
	return (
		<div
			data-testid="loading"
			className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center flex-col bg-black/25 z-1000"
		>
			<div className="flex items-center justify-center gap-x-2">
				<div className="w-8 h-8 animate-pulse bg-[#b1d991] rounded-full"></div>
				<div className="w-8 h-8 animate-pulse bg-[#4fb85e] rounded-full"></div>
				<div className="w-8 h-8 animate-pulse bg-[#2a6424] rounded-full"></div>
			</div>
			<div className="p-2 text-white">
				{children || 'Tunggu sebentar, sedang memuat data …'}
			</div>
		</div>
	);
};

export default LoadingFixed;
