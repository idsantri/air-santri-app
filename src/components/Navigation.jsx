import PropTypes from 'prop-types';
import { Link } from 'react-router';
import loadable from '@loadable/component';

const Button = loadable(() => import('./Button'));

const Navigation = ({ auth, onLogout }) => {
	return (
		<nav className="">
			<ul className="flex items-center gap-x-2">
				<li>
					<Button as={Link} to="/threads" iconName="entypo:chat">
						Threads
					</Button>
				</li>
				<li>
					<Button
						as={Link}
						to="/leaderboards"
						iconName="material-symbols-light:leaderboard"
					>
						Leaderboards
					</Button>
				</li>
				<li>
					<Button
						onClick={() => window.history.back()}
						iconName="material-symbols-light:arrow-back"
					>
						Kembali
					</Button>
				</li>
				<li>
					{auth ? (
						<Button
							variant="danger"
							onClick={onLogout}
							iconName="material-symbols:logout"
							id="btn-logout"
						>
							Keluar
						</Button>
					) : (
						<Button
							as={Link}
							to="/login"
							iconName="material-symbols:login"
							id="btn-login"
						>
							Login
						</Button>
					)}
				</li>
			</ul>
		</nav>
	);
};

Navigation.propTypes = {
	/** Authentication status */
	auth: PropTypes.bool,
	/** Logout function */
	onLogout: PropTypes.func.isRequired,
};

export default Navigation;
