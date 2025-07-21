const LoadingFixed = ({ children = '' }) => {
	return (
		<div
			data-testid="loading"
			className="fixed inset-0 z-[1000] flex items-center justify-center"
		>
			{/* Background dengan efek blur dan transparansi */}
			<div className="absolute inset-0 backdrop-blur-[1px] bg-base-content/30"></div>

			{/* Konten loading */}
			<div className="relative flex flex-col items-center justify-center p-6 rounded-xl shadow-lg bg-base-200/50 backdrop-saturate-150 backdrop-contrast-125">
				{/* Animasi bola loading yang lebih dinamis */}
				<div className="flex items-center justify-center gap-x-3">
					<div className="w-6 h-6 bg-[#b1d991] rounded-full animate-bounce  [animation-delay:0.1s]"></div>
					<div className="w-6 h-6 bg-[#4fb85e] rounded-full animate-bounce [animation-delay:0.3s]"></div>
					<div className="w-6 h-6 bg-[#2a6424] rounded-full animate-bounce [animation-delay:0.5s]"></div>
				</div>

				{/* Pesan teks */}
				<div className="mt-4 px-8 py-4 rounded-md text-sm font-medium text-base-content bg-base-100 shadow shadow-base-content/50 border border-base-content/50">
					{children || 'Tunggu sebentar, sedang memuat data …'}
				</div>
			</div>
		</div>
	);
};

export default LoadingFixed;
