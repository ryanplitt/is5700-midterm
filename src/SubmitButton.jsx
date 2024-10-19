import React from "react";
import { useForm } from "./FormProvider";
import Button from "@mui/material/Button";

export default function SubmitButton({ name = "Submit" }) {
	const form = useForm();
	return (
		<Button variant="contained" color="primary" onClick={form.handleSubmit}>
			{name}
		</Button>
	);
}
