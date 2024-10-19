import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, TextField, Button, Typography, Link } from "@mui/material";

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

	return (
		<Container maxWidth="sm">
			<Typography variant="h4" component="h1" gutterBottom>
				Register
			</Typography>
			<Box component="form" onSubmit={handleSubmit} noValidate>
				<TextField
					label="Email"
					type="email"
					fullWidth
					margin="normal"
					variant="outlined"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>

				<TextField
					label="Password"
					type="password"
					fullWidth
					margin="normal"
					variant="outlined"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
						setPasswordsTouched((old) => [true, old[1]]);
					}}
					error={passwordsTouched[0] && !passwordsMatch}
					helperText={passwordsTouched[0] && !passwordsMatch ? "Passwords must match" : ""}
					required
				/>

				<TextField
					label="Confirm Password"
					type="password"
					fullWidth
					margin="normal"
					variant="outlined"
					value={confirmPassword}
					onChange={(e) => {
						setConfirmPassword(e.target.value);
						setPasswordsTouched((old) => [old[0], true]);
					}}
					error={passwordsTouched[1] && !passwordsMatch}
					helperText={passwordsTouched[1] && !passwordsMatch ? "Passwords must match" : ""}
					required
				/>

				<Button type="submit" variant="contained" color="primary" fullWidth>
					Register
				</Button>
			</Box>
			<Typography variant="body2" align="center" style={{ marginTop: "1rem" }}>
				Already have an account?{" "}
				<Link href="/login" underline="hover">
					Login here
				</Link>
			</Typography>
		</Container>
	);
};

export default Register;
