import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, TextField, Button, Typography, Link } from "@mui/material";
import { useAuth } from "../useAuth0";
import TextInput from "../TextInput";
import SubmitButton from "../SubmitButton";
import { useInput } from "../FormProvider";

const Login = () => {
	return (
		<Container>
			<Typography variant="h4" component="h1" gutterBottom>
				Login
			</Typography>
			<TextInput type="email" name="Email" {...useInput("email")} />
			<TextInput name="password" type="password" {...useInput("password")} />

			<SubmitButton name="Login" />
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
