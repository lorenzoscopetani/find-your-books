import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const LogoutControls = () => {
	const { logout } = useContext(GlobalContext);
	const history = useHistory();

	const handleLogout = async () => {
		try {
			await logout();
			history.push('/');
		} catch {
			toast.error('Failed to log out');
		}
	};

	return (
		<li className="auth-links logout" onClick={handleLogout}>
			Log Out
		</li>
	);
};
