class FileDownloader {
	constructor() {
		this.baseUrl =
			import.meta.env.VITE_BASE_API + import.meta.env.VITE_END_API;
	}

	// Private method untuk memulai proses unduhan
	async #startDownload({ endPoint, fileName = 'dokumen.pdf' }) {
		try {
			const response = await fetch(this.baseUrl + endPoint);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const fileBlob = await response.blob();
			const objectUrl = window.URL.createObjectURL(fileBlob);

			const anchor = document.createElement('a');
			anchor.href = objectUrl;
			anchor.download = fileName;
			document.body.appendChild(anchor);
			anchor.click();
			anchor.remove();
			window.URL.revokeObjectURL(objectUrl);
		} catch (error) {
			console.error('Gagal mengunduh PDF:', error);
			alert('Terjadi kesalahan saat mengunduh PDF. Silakan coba lagi.');
		}
	}

	async downloadInvoice(invoiceId, saleCode) {
		return this.#startDownload({
			endPoint: `reports/sales/${invoiceId}`,
			fileName: `invoice-${saleCode}.pdf`,
		});
	}

	async downloadPayment(paymentsId) {
		return this.#startDownload({
			endPoint: `reports/payments/${paymentsId}`,
			fileName: `kuitansi-${paymentsId}.pdf`,
		});
	}
}

export default new FileDownloader();
