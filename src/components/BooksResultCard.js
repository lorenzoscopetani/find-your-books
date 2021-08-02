import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';

export const BooksResultCard = ({ book }) => {
	const { currentUser, favouriteBooks, setFavouriteBooks, addFavouriteBooks } =
		useContext(GlobalContext);

	let storedBook = favouriteBooks.find((item) => item.id === book.id);
	const disabledBtn = currentUser ? (storedBook ? true : false) : true;

	return (
		<div className="books-result-card">
			<Link to={`/${book.id}`} className="poster-wrapper">
				{book.volumeInfo.imageLinks ? (
					<img src={book.volumeInfo.imageLinks.thumbnail} alt="" />
				) : (
					<div className="filler-poster"></div>
				)}
			</Link>
			<div className="book-info">
				<Link to={`/${book.id}`} className="book-header">
					<p className="book-authors">{book.volumeInfo.authors}</p>
					<h3 className="book-title">{book.volumeInfo.title}</h3>
					<p className="published-date">
						{book.volumeInfo.publishedDate
							? book.volumeInfo.publishedDate.substring(0, 4)
							: ''}
					</p>
				</Link>
				<div className="book-controls">
					<button
						disabled={disabledBtn}
						onClick={() => addFavouriteBooks(book)}
					>
						+ ADD TO YOUR BOOKS
					</button>
				</div>
			</div>
		</div>
	);
};
