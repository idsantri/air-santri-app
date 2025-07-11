import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

function InstallPwa({ className }) {
	const [deferredPrompt, setDeferredPrompt] = useState(null);
	const [showInstallBanner, setShowInstallBanner] = useState(false);
	const [showIosComp, setShowIosComp] = useState(false);

	const getOS = () => {
		const userAgent = window.navigator.userAgent;
		const osList = [
			{ regex: /windows/i, name: 'Windows' },
			{ regex: /android/i, name: 'Android' },
			{ regex: /(iphone|ipad|ipod)/i, name: 'iOS' },
			{ regex: /linux/i, name: 'Linux' },
			{ regex: /mac/i, name: 'Mac/iOS' },
		];

		return (
			osList.find(({ regex }) => regex.test(userAgent))?.name ||
			'Unknown OS'
		);
	};
	const isIos = () => getOS() === 'iOS';
	const isAndroid = () => getOS() === 'Android';

	useEffect(() => {
		const handleBeforeInstallPrompt = (e) => {
			// Mencegah browser menampilkan prompt default
			e.preventDefault();
			// Simpan event ke state
			setDeferredPrompt(e);
			// Tampilkan UI khusus untuk instalasi

			if (isIos() || isAndroid()) {
				setShowInstallBanner(true);
			}
		};

		window.addEventListener(
			'beforeinstallprompt',
			handleBeforeInstallPrompt
		);

		return () => {
			window.removeEventListener(
				'beforeinstallprompt',
				handleBeforeInstallPrompt
			);
		};
	});

	const installPwa = () => {
		if (deferredPrompt) {
			// Tampilkan prompt instalasi
			deferredPrompt.prompt();
			// Tangani hasil pengguna
			deferredPrompt.userChoice.then((choiceResult) => {
				if (choiceResult.outcome === 'accepted') {
					console.log('User accepted the install prompt');
				} else {
					console.log('User dismissed the install prompt');
				}
				// Reset event
				setDeferredPrompt(null);
				setShowInstallBanner(false);
			});
		}
	};

	return (
		<>
			{showInstallBanner && (
				<>
					<div
						role="alert"
						className={`alert rounded-md bg-blue-600 text-blue-100 shadow-md shadow-blue-500 border-blue-200 ${className}`}
					>
						<div className="flex items-center space-x-2">
							<div>
								<Icon
									icon="typcn:info"
									height="32"
									className="text-yellow-200"
								/>
							</div>
							<div className="text-sm italic text-left">
								Instal aplikasi untuk mendapatkan pengalaman
								lebih baik!
							</div>
							{isAndroid() && (
								<button
									className="px-2 font-medium border-none shadow-sm btn btn-ghost bg-blue-200 text-blue-900 shadow-blue-950"
									onClick={installPwa}
								>
									<Icon
										icon="material-symbols-light:install-mobile"
										height="32"
									/>
									Instal
								</button>
							)}
							{isIos() && (
								<button
									className="font-medium border-none rounded-full shadow-sm btn btn-ghost btn-circle btn-sm bg-blue-200 text-blue-900 shadow-blue-950"
									onClick={() => setShowIosComp(!showIosComp)}
								>
									{showIosComp ? (
										<Icon
											icon="mingcute:up-fill"
											width="24"
											height="24"
										/>
									) : (
										<Icon
											icon="mingcute:down-fill"
											width="24"
											height="24"
										/>
									)}
								</button>
							)}
						</div>
						{showIosComp && (
							<div className="w-full px-4 py-2 text-left border rounded-md bg-blue-700">
								<p>Bagi Pengguna iOS!</p>
								<ul className="ml-4 text-sm font-light list-decimal list-outside">
									<li className="">
										Pastikan Anda menggunakan browser{' '}
										<span className="font-semibold">
											Safari
										</span>
										;
									</li>
									<li className="">
										Ketuk ikon bagikan (sebuah kotak dengan
										panah ke atas di bagian bawah layar);
									</li>
									<li>
										Gulir ke bawah dalam menu bagikan dan
										pilih opsi &ldquo;Tambahkan ke Layar
										Utama&rdquo;;
									</li>
									<li>
										Anda mungkin akan diminta untuk
										memberikan nama dan mengonfigurasi ikon;
									</li>
									<li>
										Ketuk &ldquo;Tambahkan&rdquo; di pojok
										kanan atas layar untuk menyelesaikan
										proses;
									</li>
								</ul>
							</div>
						)}
					</div>
				</>
			)}
		</>
	);
}

export default InstallPwa;
