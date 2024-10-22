import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { GlobalStyles, MenuItem } from "@mui/material";
import { useAuth } from "../useAuth0";

const Modal = ({ open, onClose, title, description, actions }) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">{description}</DialogContentText>
			</DialogContent>
			<DialogActions>
				{actions.map((action, index) => (
					<Button key={index} onClick={action.onClick}>
						{action.title}
					</Button>
				))}
			</DialogActions>
		</Dialog>
	);
};

const EditingModal = ({ open, onClose, onSave, title, fields }) => {
	const initializeFormValues = (fields) => {
		const initialValues = {};
		fields.forEach((field) => {
			initialValues[field.name] = field.value || "";
		});
		return initialValues;
	};
	const isTeacher = useAuth().isTeacher;

	const [formValues, setFormValues] = useState(initializeFormValues(fields));

	useEffect(() => {
		setFormValues(initializeFormValues(fields));
	}, [fields]);

	const handleChange = (name, value) => {
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	const handleDateChange = (name, newValue) => {
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: newValue,
		}));
	};

	const handleSave = () => {
		onSave(formValues);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Dialog open={open} onClose={onClose}>
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>
					{fields.map((field, index) => {
						if (field.type === "text" || field.type === "number") {
							return (
								<TextField
									key={index}
									margin="dense"
									label={field.label}
									name={field.name}
									type={field.type}
									fullWidth
									value={formValues[field.name] || ""}
									onChange={(e) => handleChange(field.name, e.target.value)}
									disabled={!isTeacher}
									// Add style override for disabled text color
									sx={{
										"& .MuiInputBase-input.Mui-disabled": {
											color: "black",
										},
										"& .MuiInputLabel-root.Mui-disabled": {
											color: "black",
										},
									}}
								/>
							);
						} else if (field.type === "date") {
							return (
								<DatePicker
									key={index}
									label={field.label}
									value={dayjs(formValues[field.name])}
									onChange={(newValue) => handleDateChange(field.name, newValue)}
									slotProps={{
										textField: {
											margin: "dense",
											fullWidth: true,
											sx: {
												"& .MuiInputBase-input.Mui-disabled": {
													color: "black",
												},
												"& .MuiInputLabel-root.Mui-disabled": {
													color: "black",
												},
											},
										},
									}}
									disabled={!isTeacher}
								/>
							);
						} else if (field.type === "select" && field.options) {
							return (
								<TextField
									select
									key={index}
									margin="dense"
									label={field.label}
									name={field.name}
									value={formValues[field.name] || ""}
									onChange={(e) => handleChange(field.name, e.target.value)}
									fullWidth
									disabled={!isTeacher}
									// Add style override for disabled text color
									sx={{
										"& .MuiInputBase-input.Mui-disabled": {
											color: "black",
										},
										"& .MuiInputLabel-root.Mui-disabled": {
											color: "black",
										},
									}}
								>
									{field.options.map((option, idx) => (
										<MenuItem key={idx} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
							);
						}
						return null;
					})}
				</DialogContent>
				{isTeacher && (
					<DialogActions>
						<Button onClick={onClose}>Cancel</Button>
						<Button onClick={handleSave}>Save</Button>
					</DialogActions>
				)}
			</Dialog>
		</LocalizationProvider>
	);
};

export { Modal, EditingModal };
