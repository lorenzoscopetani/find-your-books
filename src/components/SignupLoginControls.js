import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';

export const SignupLoginControls = ({ closeMobileMenu }) => {
	const { currentUser } = useContext(GlobalContext);
	return (
		<>
			<li className="auth-links login">
				<Link to="/login" onClick={closeMobileMenu}>
					Log In
				</Link>
			</li>
			<li className="auth-links signup">
				<Link to="/signup" onClick={closeMobileMenu}>
					Sign Up
				</Link>
			</li>
		</>
	);
};
