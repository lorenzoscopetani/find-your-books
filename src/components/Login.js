import React, { useState, useRef, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const [showPass, setShowPass] = useState(false);
	const [loading, setLoading] = useState(false);
	const { login } = useContext(GlobalContext);
	const history = useHistory();

	const showPassword = () => {
		setShowPass(!showPass);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			history.push('/mybooks');
		} catch {
			toast.error('Email or password wrong');
		}
		setLoading(false);
	};

	return (
		<form className="auth-form" onSubmit={handleSubmit}>
			<ToastContainer />
			<h2>Log In</h2>
			<div className="form-group email">
				<label>Email</label>
				<input type="email" ref={emailRef} />
			</div>
			<div className="form-group password">
				<label>Password</label>
				<input type={showPass ? 'text' : 'password'} ref={passwordRef} />
			</div>
			<div className="form-group show-pass">
				<i
					className={showPass ? 'far fa-eye' : 'far fa-eye-slash'}
					onClick={showPassword}
				></i>
				<p>Show Password</p>
			</div>
			<div className="form-group submit-btn">
				<button disabled={loading}>Log In</button>
			</div>
			<p>
				Need an account? <Link to="/signup">Sign Up</Link>
			</p>
		</form>
	);
};
