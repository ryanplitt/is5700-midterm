import React from "react";
import { useForm } from "./FormProvider";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

const RoleSelection = ({ roleOptions }) => {
	const form = useForm();

	const handleChange = (e) => {
		form.updateForm("role", e.target.value);
	};

	const currentRole = form.form.role || roleOptions[0].toLowerCase();

	return (
		<FormControl component="fieldset" margin="normal">
			<FormLabel component="legend">Role</FormLabel>
			<RadioGroup name="role" value={currentRole} onChange={handleChange}>
				{roleOptions.map((option) => (
					<FormControlLabel
						key={option}
						value={option.toLowerCase()}
						control={<Radio />}
						label={option.charAt(0).toUpperCase() + option.slice(1)}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
};

export default RoleSelection;
