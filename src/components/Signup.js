import React, { useState, useRef, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signup = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const [showPass, setShowPass] = useState(false);
	const [loading, setLoading] = useState(false);
	const { signup } = useContext(GlobalContext);
	const history = useHistory();

	const showPassword = () => {
		setShowPass(!showPass);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return toast.error('Password do not match');
		}
		try {
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			history.push('/mybooks');
		} catch {
			toast.error('Failed to create an account');
		}
		setLoading(false);
	};

	return (
		<form className="auth-form" onSubmit={handleSubmit}>
			<ToastContainer />
			<h2>Sign Up</h2>
			<div className="form-group email">
				<label>Email</label>
				<input type="email" ref={emailRef} />
			</div>
			<div className="form-group password">
				<label>Password</label>
				<input type={showPass ? 'text' : 'password'} ref={passwordRef} />
			</div>
			<div className="form-group password-confirm">
				<label>Password Confirm</label>
				<input type={showPass ? 'text' : 'password'} ref={passwordConfirmRef} />
			</div>
			<div className="form-group show-pass">
				<i
					className={showPass ? 'far fa-eye' : 'far fa-eye-slash'}
					onClick={showPassword}
				></i>
				<p>Show Password</p>
			</div>
			<div className="form-group submit-btn">
				<button disabled={loading}>Sign Up</button>
			</div>
			<p>
				Already have an account? <Link to="/login">Log In</Link>
			</p>
		</form>
	);
};
