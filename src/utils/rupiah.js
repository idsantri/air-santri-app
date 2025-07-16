Number.prototype.toRupiah = function (symbol = true, fraction = 0) {
	if (symbol) {
		return this.toLocaleString('id-ID', {
			style: 'currency',
			currency: 'IDR',
			maximumFractionDigits: fraction,
		});
	} else {
		return this.toLocaleString('id-ID');
	}
};

BigInt.prototype.toRupiah = function (symbol = true, fraction = 0) {
	if (symbol) {
		return this.toLocaleString('id-ID', {
			style: 'currency',
			currency: 'IDR',
			maximumFractionDigits: fraction,
		});
	} else {
		return this.toLocaleString('id-ID');
	}
};

function isNumber(value) {
	if (typeof value === 'number') {
		return true;
	}

	const parsedValue = parseFloat(value);
	return !isNaN(parsedValue) && isFinite(parsedValue);
}

String.prototype.toRupiah = function (symbol = true, fraction = 0) {
	if (isNumber(this)) {
		if (symbol) {
			return Number(this).toLocaleString('id-ID', {
				style: 'currency',
				currency: 'IDR',
				maximumFractionDigits: fraction,
			});
		} else {
			return Number(this).toLocaleString('id-ID');
		}
	} else {
		return this.toString();
	}
};
