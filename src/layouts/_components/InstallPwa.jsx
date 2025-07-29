import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

function InstallPwa() {
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
			handleBeforeInstallPrompt,
		);

		return () => {
			window.removeEventListener(
				'beforeinstallprompt',
				handleBeforeInstallPrompt,
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
						className="card bg-success mb-2 p-2 rounded-md text-success-content"
					>
						<div className="flex items-center justify-between gap-2">
							<div className="flex items-center gap-2">
								<div>
									<Icon
										icon="typcn:info"
										height="32"
										className=""
									/>
								</div>
								<div className="text-sm italic text-left">
									Instal aplikasi untuk mendapatkan pengalaman
									lebih baik!
								</div>
							</div>

							{isAndroid() && (
								<button
									className="btn btn-neutral px-2 "
									onClick={installPwa}
								>
									<Icon
										icon="material-symbols-light:install-mobile"
										height="24"
									/>
									Instal
								</button>
							)}
							{isIos() && (
								<button
									className="font-medium border-none rounded-full shadow-sm btn btn-ghost btn-circle btn-sm  text-neutral shadow-neutral"
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
							<>
								<div className="divider mt-2 mb-0"></div>
								<div className="w-full text-left card rounded-md ">
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
											Ketuk ikon bagikan (sebuah kotak
											dengan panah ke atas di bagian bawah
											layar);
										</li>
										<li>
											Gulir ke bawah dalam menu bagikan
											dan pilih opsi &ldquo;Tambahkan ke
											Layar Utama&rdquo;;
										</li>
										<li>
											Anda mungkin akan diminta untuk
											memberikan nama dan mengonfigurasi
											ikon;
										</li>
										<li>
											Ketuk &ldquo;Tambahkan&rdquo; di
											pojok kanan atas layar untuk
											menyelesaikan proses;
										</li>
									</ul>
								</div>
							</>
						)}
					</div>
				</>
			)}
		</>
	);
}

export default InstallPwa;
