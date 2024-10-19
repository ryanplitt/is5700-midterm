import React from "react";
import { useInput } from "./FormProvider";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";

const TextInput = ({ name, type = "text", ...props }) => {
	return (
		<Box mb={2}>
			<TextField
				label={name}
				type={type}
				fullWidth
				variant="outlined"
				{...useInput(name)}
				{...props}
			/>
		</Box>
	);
};

export default TextInput;
