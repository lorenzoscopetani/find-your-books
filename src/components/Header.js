import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import { LogoutControls } from './LogoutControls';
import { SignupLoginControls } from './SignupLoginControls';

export const Header = () => {
	const { currentUser } = useContext(GlobalContext);
	const [menuOpen, setMenuOpen] = useState(false);

	const handleMenuOpen = () => setMenuOpen(!menuOpen);
	const closeMobileMenu = () => setMenuOpen(false);

	return (
		<div className="header">
			<div className="header-logo">
				<Link to="/"> 📚 Find Your Books</Link>
			</div>
			<div className="hamburger" onClick={handleMenuOpen}>
				<i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
			</div>
			<ul className={menuOpen ? 'header-menu active' : 'header-menu'}>
				<li>
					<Link to="/" onClick={closeMobileMenu}>
						Search Books
					</Link>
				</li>
				<li>
					<Link to="/mybooks" onClick={closeMobileMenu}>
						My Books
					</Link>
				</li>
				{currentUser ? (
					<LogoutControls closeMobileMenu={closeMobileMenu} />
				) : (
					<SignupLoginControls closeMobileMenu={closeMobileMenu} />
				)}
			</ul>
		</div>
	);
};
