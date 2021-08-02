import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';

export const MyBookCard = ({ book }) => {
	const { favouriteBooks, setFavouriteBooks } = useContext(GlobalContext);

	const removeFavBook = () => {
		setFavouriteBooks(favouriteBooks.filter((item) => item.id !== book.id));
	};

	return (
		<div className="mybook-card">
			<div className="mybook-img-container">
				<Link to={`/${book.id}`}>
					{book.volumeInfo.imageLinks ? (
						<img src={book.volumeInfo.imageLinks.thumbnail} alt="" />
					) : (
						<div className="no-poster"></div>
					)}
				</Link>
			</div>
			<button className="remove-btn" onClick={removeFavBook}>
				<i className="fas fa-trash-alt"></i>
			</button>
		</div>
	);
};
