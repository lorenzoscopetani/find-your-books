import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { MyBookCard } from './MyBookCard';

export const MyBooks = () => {
	const { favouriteBooks } = useContext(GlobalContext);
	return (
		<div className="mybooks-page">
			<h2>My Books List</h2>
			<div className="mybooks-container">
				{favouriteBooks.length > 0 ? (
					favouriteBooks.map((book) => <MyBookCard book={book} key={book.id} />)
				) : (
					<h2 className="message">No books in your list, add some!</h2>
				)}
			</div>
		</div>
	);
};
