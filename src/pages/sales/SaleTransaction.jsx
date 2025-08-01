import React, { useEffect, useState } from 'react';
import { useTransactionStore } from '../../store/transactionStore';
import { useSwipeable } from 'react-swipeable';
import Step1Inputs from './transaction-steps/Step1Inputs';
import Step2Inputs from './transaction-steps/Step2Inputs';
import Step3Inputs from './transaction-steps/Step3Inputs';
import Step4Confirmation from './transaction-steps/Step4Confirmation';
import useConfirmDialog from '../../hooks/useConfirmDialog';

export default function SaleTransaction() {
	const [step, setStep] = useState(0);
	const { reset } = useTransactionStore();
	const dialog = useConfirmDialog();

	useEffect(() => reset(), [reset]);

	// swipe banyak masalah
	const _swipeHandlers = useSwipeable({
		onSwipedLeft: () => handleNext(),
		onSwipedRight: () => handleBack(),
		preventDefaultTouchmoveEvent: true,
		trackMouse: true, // agar bisa swipe pakai mouse juga
	});

	const steps = ['Mulai', 'Pilih Produk', 'Pembayaran', 'Konfirmasi'];

	const handleNext = () => {
		// console.log('Next clicked at step:', step);
		setStep((prev) => Math.min(prev + 1, steps.length - 1));
		// console.log(sale);
	};

	const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

	const goToStep = (n) => {
		setStep(n);
	};

	const renderStepContent = () => {
		switch (step) {
			case 0:
				return <Step1Inputs />;
			case 1:
				return <Step2Inputs />;
			case 2:
				return <Step3Inputs />;
			case 3:
				return <Step4Confirmation goToStep={goToStep} />;
			default:
				return null;
		}
	};

	const handleCancel = async () => {
		const isConfirmed = await dialog({
			title: 'Gagal?',
			message: 'Gagalkan transaksi?',
		});
		if (!isConfirmed) return;
		window.history.back();
	};

	return (
		<>
			<div className="card p-2 border border-base-200 rounded-sm">
				<header>
					<div className="flex items-center justify-between rounded-sm p-2 bg-accent text-accent-content mb-2">
						<h2 className="text-xl">Formulir Transaksi</h2>
						<p className="badge badge-info">Baru</p>
					</div>
				</header>
				<ul className="steps w-full my-2">
					{steps.map((label, index) => (
						<li
							key={index}
							className={`step text-sm ${step >= index ? 'step-accent' : ''} cursor-pointer`}
							onClick={() => setStep(index)}
						>
							{label}
						</li>
					))}
				</ul>
				<div>
					<div
						// {...swipeHandlers}
						className="p-2 h-[55vh] overflow-y-scroll"
					>
						{renderStepContent()}
					</div>

					<div className="flex items-center justify-between p-2 bg-secondary/25">
						<button
							className="btn"
							disabled={step == 0}
							onClick={handleBack}
						>
							Kembali
						</button>
						<button
							type="button"
							className="btn btn-outline font-light btn-sm btn-dash"
							onClick={handleCancel}
						>
							Gagal
						</button>
						<button
							className="btn"
							disabled={step == steps.length - 1}
							onClick={handleNext}
						>
							Lanjut
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
