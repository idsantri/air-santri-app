import { useState } from 'react';

function Tabs({ tab1, tab2, tab3 = null }) {
	const [activeTab, setActiveTab] = useState('tab1');
	return (
		<div className="mt-2">
			{/* Tab Navigation */}
			<div role="tablist" className="tabs tabs-border mb-1 ">
				<button
					className={`tab ${activeTab === 'tab1' ? 'tab-active' : ''}`}
					onClick={() => setActiveTab('tab1')}
				>
					{tab1.label}
				</button>
				<button
					className={`tab ${activeTab === 'tab2' ? 'tab-active' : ''}`}
					onClick={() => setActiveTab('tab2')}
				>
					{tab2.label}
				</button>
				{tab3 && (
					<button
						className={`tab ${activeTab === 'tab3' ? 'tab-active' : ''}`}
						onClick={() => setActiveTab('tab3')}
					>
						{tab3.label}
					</button>
				)}
			</div>

			<div>
				{activeTab === 'tab1' && tab1.component}
				{activeTab === 'tab2' && tab2.component}
				{tab3 && activeTab === 'tab3' && tab3.component}
			</div>
		</div>
	);
}

export default Tabs;
