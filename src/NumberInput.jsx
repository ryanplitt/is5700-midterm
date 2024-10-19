import React from "react";
import { useNumberInput } from "./FormProvider";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";

const NumberInput = ({ name, ...props }) => {
	return (
		<Box mb={2}>
			<TextField
				label={name}
				type="number"
				fullWidth
				variant="outlined"
				{...useNumberInput(name)}
				{...props}
			/>
		</Box>
	);
};

export default NumberInput;
