import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, TextField, Button, Typography, Link } from "@mui/material";

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
		<Container maxWidth="sm">
			<Typography variant="h4" component="h1" gutterBottom>
				Login
			</Typography>
			<Box component="form" onSubmit={handleSubmit} noValidate>
				<TextField
					label="Email"
					type="email"
					fullWidth
					variant="outlined"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>

				<TextField
					label="Password"
					type="password"
					fullWidth
					variant="outlined"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>

				<Button type="submit" variant="contained" color="primary" fullWidth>
					Login
				</Button>
			</Box>
			<Typography variant="body2" align="center" style={{ marginTop: "1rem" }}>
				Don't have an account?{" "}
				<Link href="/register" underline="hover">
					Register here
				</Link>
			</Typography>
		</Container>
	);
};

export default Login;
