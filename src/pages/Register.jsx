import React, { useMemo } from "react";
import { Container, Box, TextField, Button, Typography, Link } from "@mui/material";
import { useInput, useForm } from "../FormProvider";
import TextInput from "../TextInput";
import SubmitButton from "../SubmitButton";

const Register = () => {
	const form = useForm().form;

	const passwordsMatch = useMemo(() => {
		return (
			form.password === form.confirmPassword && form.password !== "" && form.confirmPassword !== ""
		);
	}, [form.password, form.confirmPassword]);

	const allowRegister = useMemo(() => {
		return form.email !== "" && passwordsMatch;
	}, [form.email, passwordsMatch]);

	return (
		<Container>
			<Typography variant="h4" component="h1" gutterBottom>
				Register
			</Typography>
			<TextInput type="email" label="Email" {...useInput("email")} />
			<TextInput
				name="password"
				type="password"
				label="Password"
				error={!passwordsMatch}
				helperText={!passwordsMatch ? "Passwords must match" : ""}
			/>

			<TextInput
				name="confirmPassword"
				type="password"
				label="Confirm Password"
				error={!passwordsMatch}
				helperText={!passwordsMatch ? "Passwords must match" : ""}
			/>

			<SubmitButton name="Register" isValid={allowRegister} />

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
