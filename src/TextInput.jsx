import React from "react";
import { useForm, useInput } from "./FormProvider";

const TextInput = ({ label, name, type }) => {
	const form = useForm();

	return (
		<div style={{ marginBottom: "1rem" }}>
			<label htmlFor={name}>{label}:</label>
			<input
				type={type}
				{...useInput(name)}
				required
				style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
			/>
		</div>
	);
};

export default TextInput;
