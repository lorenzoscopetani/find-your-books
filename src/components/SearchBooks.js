import React, { useState, useEffect, useRef, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { BooksResultCard } from './BooksResultCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SearchBooks = () => {
	const [booksResult, setBooksResult] = useState([]);
	const { axiosInstance, currentUser } = useContext(GlobalContext);
	const bookNameRef = useRef();

	const getBooksResult = async (e) => {
		e.preventDefault();
		const title = bookNameRef.current.value;
		if (title === '') {
			toast.warn('You have to write something');
		} else {
			try {
				const res = await axiosInstance.get(
					`/volumes?q=${title}&maxResults=40`
				);
				if (res.data.totalItems > 0) {
					console.log(res);
					setBooksResult(res.data.items);
				} else {
					toast.error('0 books found');
				}
			} catch {
				toast.error('Something went wrong');
			}
		}
		bookNameRef.current.value = '';
	};

	return (
		<>
			<ToastContainer />
			<form className="search-form" onSubmit={getBooksResult}>
				<h3>Search books from Google Books!</h3>
				<div className="search-bar">
					<input type="text" ref={bookNameRef} />
					<button onClick={getBooksResult}>
						<i className="fas fa-search"></i>
					</button>
				</div>
			</form>
			<div className="books-result-wrapper">
				<ul className="books-list">
					{booksResult.map((book) => (
						<li key={book.id}>
							<BooksResultCard book={book} key={book.id} />
						</li>
					))}
				</ul>
			</div>
		</>
	);
};
