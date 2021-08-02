import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { currentUser } = useContext(GlobalContext);
	return (
		<Route
			{...rest}
			render={(props) => {
				return currentUser ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				);
			}}
		></Route>
	);
};

export default PrivateRoute;
