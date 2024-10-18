import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordsTouched, setPasswordsTouched] = useState([false, false]);
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		// TODO: Implement registration logic here
		console.log("Name:", name, "Email:", email, "Password:", password);

		navigate("/dashboard");
	};

	const passwordsMatch = password === confirmPassword && password !== "";

	const passwordClass =
		passwordsTouched[0] && passwordsTouched[1]
			? passwordsMatch
				? "input is-success"
				: "input is-danger"
			: "input";

	return (
		<section className="section">
			<div className="container">
				<h1 className="title">Register</h1>
				<div className="box">
					<form onSubmit={handleSubmit}>
						<div className="field">
							<label className="label">Email</label>
							<div className="control">
								<input
									className="input"
									type="email"
									placeholder="e.g. alex@example.com"
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
									}}
									required
								/>
							</div>
						</div>

						<div className="field">
							<label className="label">Password</label>
							<div className="control">
								<input
									className={passwordClass}
									type="password"
									placeholder="********"
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
										setPasswordsTouched((old) => [true, old[1]]);
									}}
									required
								/>
							</div>
						</div>

						<div className="field">
							<label className="label">Confirm Password</label>
							<div className="control">
								<input
									className={passwordClass}
									type="password"
									placeholder="********"
									value={confirmPassword}
									onChange={(e) => {
										setConfirmPassword(e.target.value);
										setPasswordsTouched((old) => [old[0], true]);
									}}
									required
								/>
							</div>
						</div>

						<div className="field">
							<div className="control">
								<button className="button is-primary">Register</button>
							</div>
						</div>
					</form>
				</div>
				<p>
					Already have an account? <a href="/login">Login here</a>.
				</p>
			</div>
		</section>
	);
};

export default Register;
