import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		// TODO: Implement registration logic here
		console.log("Name:", name, "Email:", email, "Password:", password);

		navigate("/dashboard");
	};

	return (
		<section className="section">
			<div className="container">
				<h1 className="title">Register</h1>
				<div className="box">
					<form onSubmit={handleSubmit}>
						<div className="field">
							<label className="label">Name</label>
							<div className="control">
								<input
									className="input"
									type="text"
									placeholder="e.g. Alex Smith"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</div>
						</div>

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
