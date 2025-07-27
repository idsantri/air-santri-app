import React from 'react';
import useCustomerStore from '../../store/customerStore';
import { Link } from 'react-router';
import { Icon } from '@iconify/react/dist/iconify.js';

function CustomerReferral() {
	const { referrals } = useCustomerStore((state) => state);
	return (
		<>
			<div className="card card-border rounded-sm mt-2 p-2">
				<div className="mb-2 flex items-center justify-between bg-base-200/75 rounded-sm p-2">
					<h3 className="text-lg">Data Referral</h3>
				</div>
				{referrals?.length > 0 ? (
					<ul className="list bg-base-100 rounded-sm shadow-md">
						{referrals.map((referral) => (
							<li className="list-row" key={referral.id}>
								<div className="list-col-shrink">
									<Link
										className="btn btn-circle btn-info"
										to={`/customers/${referral.id}`}
									>
										<Icon icon="material-symbols:info-outline-rounded" />
									</Link>
								</div>
								<div className="list-col-grow">
									<div>{`${referral.name} (${referral.code})`}</div>
									<div className="list-col-wrap text-xs opacity-80">
										{`${referral.address ?? '?'} ${referral.district ?? '?'}`}
									</div>
								</div>
							</li>
						))}
					</ul>
				) : (
					<div className="card rounded-sm p-4 text-center bg-base-300/50">
						<p>Tidak ada referral</p>
					</div>
				)}
			</div>
		</>
	);
}

export default CustomerReferral;
