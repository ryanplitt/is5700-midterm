import React from "react";
import { useForm } from "./FormProvider";
import Button from "@mui/material/Button";

export default function SubmitButton({ name = "Submit" }, isValid = true) {
	const form = useForm();
	return (
		<Button
			variant="contained"
			color="primary"
			onClick={() => {
				isValid && form.handleSubmit();
			}}
		>
			{name}
		</Button>
	);
}
