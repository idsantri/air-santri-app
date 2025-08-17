const kecamatan = [
	// BANGKALAN
	{
		id: '352601',
		kabupaten_id: '3526',
		kabupaten: 'Bangkalan',
		kecamatan: 'Bangkalan',
	},
	{
		id: '352602',
		kabupaten_id: '3526',
		kabupaten: 'Bangkalan',
		kecamatan: 'Socah',
	},
	{
		id: '352603',
		kabupaten_id: '3526',
		kabupaten: 'Bangkalan',
		kecamatan: 'Burneh',
	},
	{
		id: '352604',
		kabupaten_id: '3526',
		kabupaten: 'Bangkalan',
		kecamatan: 'Kamal',
	},
	{
		id: '352605',
		kabupaten_id: '3526',
		kabupaten: 'Bangkalan',
		kecamatan: 'Arosbaya',
	},
	{
		id: '352606',
		kabupaten_id: '3526',
		kabupaten: 'Bangkalan',
		kecamatan: 'Geger',
	},
	{
		id: '352607',
		kabupaten_id: '3526',
		kabupaten: 'Bangkalan',
		kecamatan: 'Klampis',
	},
	{
		id: '352608',
		kabupaten_id: '3526',
		kabupaten: 'Bangkalan',
		kecamatan: 'Sepulu',
	},
	{
		id: '352609',
		kabupaten_id: '3526',
		kabupaten: 'Bangkalan',
		kecamatan: 'Tanjung Bumi',
	},
	{
		id: '352610',
		kabupaten_id: '3526',
		kabupaten: 'Bangkalan',
		kecamatan: 'Kokop',
	},
	{
		id: '352611',
		kabupaten_id: '3526',
		kabupaten: 'Bangkalan',
		kecamatan: 'Kwanyar',
	},
	{
		id: '352612',
		kabupaten_id: '3526',
		kabupaten: 'Bangkalan',
		kecamatan: 'Labang',
	},
	{
		id: '352613',
		kabupaten_id: '3526',
		kabupaten: 'Bangkalan',
		kecamatan: 'Tanah Merah',
	},
	{
		id: '352614',
		kabupaten_id: '3526',
		kabupaten: 'Bangkalan',
		kecamatan: 'Tragah',
	},
	{
		id: '352615',
		kabupaten_id: '3526',
		kabupaten: 'Bangkalan',
		kecamatan: 'Blega',
	},
	{
		id: '352616',
		kabupaten_id: '3526',
		kabupaten: 'Bangkalan',
		kecamatan: 'Modung',
	},
	{
		id: '352617',
		kabupaten_id: '3526',
		kabupaten: 'Bangkalan',
		kecamatan: 'Konang',
	},
	{
		id: '352618',
		kabupaten_id: '3526',
		kabupaten: 'Bangkalan',
		kecamatan: 'Galis',
	},
	// SAMPANG
	{
		id: '352701',
		kabupaten_id: '3527',
		kabupaten: 'Sampang',
		kecamatan: 'Sreseh',
	},
	{
		id: '352702',
		kabupaten_id: '3527',
		kabupaten: 'Sampang',
		kecamatan: 'Torjun',
	},
	{
		id: '352703',
		kabupaten_id: '3527',
		kabupaten: 'Sampang',
		kecamatan: 'Sampang',
	},
	{
		id: '352704',
		kabupaten_id: '3527',
		kabupaten: 'Sampang',
		kecamatan: 'Camplong',
	},
	{
		id: '352705',
		kabupaten_id: '3527',
		kabupaten: 'Sampang',
		kecamatan: 'Omben',
	},
	{
		id: '352706',
		kabupaten_id: '3527',
		kabupaten: 'Sampang',
		kecamatan: 'Kedungdung',
	},
	{
		id: '352707',
		kabupaten_id: '3527',
		kabupaten: 'Sampang',
		kecamatan: 'Jrengik',
	},
	{
		id: '352708',
		kabupaten_id: '3527',
		kabupaten: 'Sampang',
		kecamatan: 'Tambelangan',
	},
	{
		id: '352709',
		kabupaten_id: '3527',
		kabupaten: 'Sampang',
		kecamatan: 'Banyuates',
	},
	{
		id: '352710',
		kabupaten_id: '3527',
		kabupaten: 'Sampang',
		kecamatan: 'Robatal',
	},
	{
		id: '352711',
		kabupaten_id: '3527',
		kabupaten: 'Sampang',
		kecamatan: 'Sokobanah',
	},
	{
		id: '352712',
		kabupaten_id: '3527',
		kabupaten: 'Sampang',
		kecamatan: 'Ketapang',
	},
	{
		id: '352713',
		kabupaten_id: '3527',
		kabupaten: 'Sampang',
		kecamatan: 'Pangarengan',
	},
	{
		id: '352714',
		kabupaten_id: '3527',
		kabupaten: 'Sampang',
		kecamatan: 'Karangpenang',
	},
];

// export default kecamatan
// 	.sort((a, b) => {
// 		const kabupatenCompare = a.kabupaten.localeCompare(b.kabupaten);
// 		if (kabupatenCompare !== 0) return kabupatenCompare;
// 		return a.kecamatan.localeCompare(b.kecamatan);
// 	})
// 	.map((item) => item.kecamatan + ' — ' + item.kabupaten);
export default kecamatan.map((item) => item.kecamatan).sort();
