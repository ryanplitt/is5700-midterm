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

const EditingModal = ({ open, onClose, onSave, title, fields, readOnly = false }) => {
	function createInitialState() {
		const initialValues = {};
		fields.forEach((field) => {
			initialValues[field.name] = field.value || "";
		});
		return initialValues;
	}

	const [formValues, setFormValues] = useState(createInitialState);

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
		console.log(formValues);
		onSave(formValues);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Dialog open={open} onClose={onClose} aria-labelledby="editing-dialog-title">
				<DialogTitle id="editing-dialog-title">{title}</DialogTitle>
				<DialogContent>
					{fields &&
						fields.map((field, index) => {
							if (field.type === "text") {
								return (
									<TextField
										key={index}
										margin="dense"
										label={field.label}
										name={field.name}
										type="text"
										fullWidth
										value={formValues[field.name]}
										onChange={(event) => handleChange(field.name, event.target.value)}
										disabled={readOnly}
									/>
								);
							} else if (field.type === "date") {
								return (
									<DatePicker
										key={index}
										label={field.label}
										value={formValues[field.name] ? dayjs(formValues[field.name]) : null}
										onChange={(newValue) => handleDateChange(field.name, newValue)}
										slotProps={{
											textField: {
												margin: "dense",
												fullWidth: true,
											},
										}}
										disabled={readOnly}
									/>
								);
							}
							return null;
						})}
				</DialogContent>
				{!readOnly && (
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
