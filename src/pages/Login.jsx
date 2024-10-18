import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Email:", email, "Password:", password);

		// TODO: Implement login logic here

		navigate("/dashboard");
	};

	return (
		<section className="section">
			<div className="container">
				<h1 className="title">Login</h1>
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
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
						</div>

						<div className="field">
							<label className="label">Password</label>
							<div className="control">
								<input
									className="input"
									type="password"
									placeholder="********"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
						</div>

						<div className="field">
							<div className="control">
								<button className="button is-primary">Login</button>
							</div>
						</div>
					</form>
				</div>
				<p>
					Don't have an account? <a href="/register">Register here</a>.
				</p>
			</div>
		</section>
	);
};

export default Login;
