import { useState } from 'react';
import SaleListDetail from './SaleListDetail';
import SaleListPayment from './SaleListPayment';

function SaleDetailTab() {
	const [activeTab, setActiveTab] = useState('tab1');
	return (
		<div className="mt-2">
			{/* Tab Navigation */}
			<div role="tablist" className="tabs tabs-border mb-1 ">
				<button
					className={`tab ${activeTab === 'tab1' ? 'tab-active' : ''}`}
					onClick={() => setActiveTab('tab1')}
				>
					Detail Barang
				</button>
				<button
					className={`tab ${activeTab === 'tab2' ? 'tab-active' : ''}`}
					onClick={() => setActiveTab('tab2')}
				>
					Pembayaran
				</button>
			</div>

			<div>
				{activeTab === 'tab1' && <SaleListDetail />}
				{activeTab === 'tab2' && <SaleListPayment />}
			</div>
		</div>
	);
}

export default SaleDetailTab;
