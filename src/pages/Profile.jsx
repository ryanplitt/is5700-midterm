import React, { useState } from "react";
import {
	TextField,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	FormLabel,
	Button,
	Container,
	Typography,
} from "@mui/material";
import { FormProvider } from "../FormProvider";
import TextInput from "../TextInput";
import SubmitButton from "../SubmitButton";
import { useAuth } from "../useAuth0";
import RoleSelection from "../RoleSelection";
import NumberInput from "../NumberInput";

const Profile = () => {
	const auth = useAuth();

	const handleSubmit = (form) => {
		if (form.name && form.email && form.password && form.role) {
			if (auth.user) {
				auth.updateUser(form);
			}
		}
		console.log(form);
	};

	return (
		<FormProvider onSubmit={handleSubmit}>
			<Container maxWidth="sm">
				<Typography variant="h4" component="h1" gutterBottom>
					Profile
				</Typography>
				<TextInput name="name" />
				<TextInput name="email" />
				<TextInput name="password" type="password" />
				<NumberInput name="age" />
				<RoleSelection roleOptions={["student", "teacher"]} />
				<TextInput name="favoriteFood" />
				<SubmitButton />
			</Container>
		</FormProvider>
	);
};

export default Profile;
