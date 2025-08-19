import { sanitizeFileName } from '../utils/string';
import api from './api';

class FileDownloader {
	#downloadBlob(blob, fileName = 'dokumen.pdf') {
		const objectUrl = window.URL.createObjectURL(blob);
		const anchor = document.createElement('a');

		anchor.href = objectUrl;
		anchor.download = sanitizeFileName(fileName);
		document.body.appendChild(anchor);

		anchor.click();
		anchor.remove();
		window.URL.revokeObjectURL(objectUrl);
	}

	async #fetchDownload(endPoint, fileName) {
		api.setNotify(true);
		const blob = await api.fetchFile(endPoint, fileName);
		return this.#downloadBlob(blob, fileName);
	}

	async downloadInvoice(saleId, fileName) {
		await this.#fetchDownload(`reports/sales/${saleId}/invoice`, fileName);
	}

	async downloadReceipt(saleId, fileName) {
		await this.#fetchDownload(`reports/sales/${saleId}/receipt`, fileName);
	}

	async downloadPayment(paymentsId, fileName) {
		await this.#fetchDownload(`reports/payments/${paymentsId}`, fileName);
	}
}

export default new FileDownloader();
