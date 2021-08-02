import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';
import './App.css';
import { Header } from './components/Header';
import { SearchBooks } from './components/SearchBooks';
import { MyBooks } from './components/MyBooks';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { BookResultPage } from './components/BookResultPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
	return (
		<Router>
			<GlobalProvider>
				<Header />
				<Switch>
					<Route exact path="/" component={SearchBooks} />
					<PrivateRoute exact path="/mybooks" component={MyBooks} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/:id" component={BookResultPage} />
				</Switch>
			</GlobalProvider>
		</Router>
	);
}

export default App;
