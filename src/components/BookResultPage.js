import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const BookResultPage = (props) => {
	const { axiosInstance, favouriteBooks, currentUser, addFavouriteBooks } =
		useContext(GlobalContext);
	const [book, setBook] = useState({});
	const [favBook, setFavBook] = useState();

	useEffect(() => {
		fetchData();
	}, []);

	const id = props.match.params.id;

	let storedBook = favouriteBooks.find((item) => item.id === id);
	const disabledBtn = currentUser ? (storedBook ? true : false) : true;

	const fetchData = async () => {
		const res = await axiosInstance.get(`/volumes/${id}`);
		try {
			setBook(res.data.volumeInfo);
			setFavBook(res.data);
		} catch {
			toast.error('Something went wrong');
		}
	};

	return (
		<div className="book-container">
			<ToastContainer />
			<div className="image-container">
				{book.imageLinks ? (
					<img src={book.imageLinks.thumbnail} alt="" />
				) : (
					<div className="filler-poster"></div>
				)}
			</div>
			<div className="book-information-box">
				<h4>{book.authors}</h4>
				<h2>{book.title}</h2>
				<p>
					<strong>Published Date: </strong>
					{book.publishedDate ? book.publishedDate.substring(0, 4) : '-'}
				</p>
				<p>
					<strong>Publisher: </strong>
					{book.publisher ? book.publisher : '-'}
				</p>
				<p>
					<strong>Language: </strong>
					{book.language ? book.language : '-'}
				</p>
				<ul className="book-categories">
					{book.categories && book.categories.map((item) => <li>{item}</li>)}
				</ul>
				<p className="book-description">
					<strong>Description: </strong>
					{book.description ? book.description : ' No description available'}
				</p>
				<a className="link" href={book.infoLink}>
					INFO LINK
				</a>
				<a className="link" href={book.previewLink}>
					PREVIEW LINK
				</a>
			</div>
			<div className="book-button">
				<button
					disabled={disabledBtn}
					className="add-btn"
					onClick={() => addFavouriteBooks(favBook)}
				>
					<i className="fas fa-plus"></i>
				</button>
			</div>
		</div>
	);
};
