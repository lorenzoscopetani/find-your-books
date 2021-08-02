import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { auth } from '../firebase';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);
	const [favouriteBooks, setFavouriteBooks] = useState(
		localStorage.getItem('favouriteBooks')
			? JSON.parse(localStorage.getItem('favouriteBooks'))
			: []
	);

	useEffect(() => {
		localStorage.setItem('favouriteBooks', JSON.stringify(favouriteBooks));
	}, [favouriteBooks]);

	const axiosInstance = axios.create({
		baseURL: 'https://www.googleapis.com/books/v1',
	});

	const signup = (email, password) => {
		return auth.createUserWithEmailAndPassword(email, password);
	};

	const login = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password);
	};

	const logout = () => {
		return auth.signOut();
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const addFavouriteBooks = (book) => {
		setFavouriteBooks([...favouriteBooks, book]);
	};

	const value = {
		axiosInstance,
		currentUser,
		signup,
		login,
		logout,
		favouriteBooks,
		setFavouriteBooks,
		addFavouriteBooks,
	};
	return (
		<GlobalContext.Provider value={value}>
			{!loading && children}
		</GlobalContext.Provider>
	);
};
