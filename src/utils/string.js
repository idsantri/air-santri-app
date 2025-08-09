function sanitizeFileName(name) {
	return name
		.replace(/\s+/g, '-') // Ganti spasi dengan tanda minus
		.replace(/[/?%*:|"<>]/g, '-') // Ganti karakter ilegal dengan tanda minus
		.replace(/-+/g, '-') // Hindari tanda minus berulang
		.replace(/^-+|-+$/g, ''); // Hapus tanda minus di awal/akhir
}

export { sanitizeFileName };
