import React, { useState } from "react";
import { ListItem, ListItemText, Typography, Divider, Button, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal, EditingModal } from "./Modal";
import dayjs from "dayjs";
import useModules from "../hooks/useModules";
import { useAuth } from "../useAuth0";

const AssignmentListItem = ({ assignment, index, onSave, onDelete }) => {
	const [openDelete, setOpenDelete] = useState(false);
	const [openDetails, setOpenDetails] = useState(false);
	const { modules } = useModules();
	const { isTeacher } = useAuth().isTeacher;

	const handleDeleteClick = () => {
		setOpenDelete(false);
		onDelete(assignment.id);
	};

	const handleCloseDelete = () => {
		setOpenDelete(false);
	};

	const handleCloseDetails = () => {
		setOpenDetails(false);
	};

	const handleSave = async (updatedFields) => {
		console.log(updatedFields);
		const newAssignment = {
			...assignment,
			...updatedFields,
		};
		onSave(assignment.id, newAssignment);
		handleCloseDetails();
	};

	return (
		<div key={index}>
			<ListItem
				sx={{ paddingRight: "140px", width: "100%" }}
				onClick={() => setOpenDetails(true)}
				component="div"
				secondaryAction={
					isTeacher && (
						<Button
							variant="outlined"
							startIcon={<DeleteIcon />}
							onClick={(e) => {
								e.stopPropagation();
								setOpenDelete(true);
							}}
						>
							Delete
						</Button>
					)
				}
			>
				<ListItemText
					primary={
						<Typography variant="h6" component="div">
							{assignment.title}
						</Typography>
					}
					secondary={
						<Box component="span" sx={{ display: "flex", flexDirection: "column" }}>
							<Typography component="span" variant="body1">
								{assignment.description}
							</Typography>
							<Typography component="span" variant="caption" color="text.secondary">
								Due: {dayjs(assignment.dueDate).format("MMMM D, YYYY")}
							</Typography>
						</Box>
					}
				/>
			</ListItem>
			<Divider />

			<Modal
				open={openDelete}
				onClose={handleCloseDelete}
				title="Delete Assignment"
				description="Are you sure you want to delete this assignment?"
				actions={[
					{
						title: "Cancel",
						onClick: handleCloseDelete,
					},
					{
						title: "Delete",
						onClick: handleDeleteClick,
					},
				]}
			/>

			<EditingModal
				open={openDetails}
				onClose={handleCloseDetails}
				onSave={handleSave}
				title={isTeacher ? "Edit Assignment" : "Assignment Details"}
				fields={[
					{ label: "Title", name: "title", value: assignment.title, type: "text" },
					{
						label: "Description",
						name: "description",
						value: assignment.description,
						type: "text",
					},
					{ label: "Due Date", name: "dueDate", value: assignment.dueDate, type: "date" },
					{
						label: "Module",
						name: "moduleId",
						value: assignment.moduleId || "",
						type: "select",
						options: modules.map((module) => ({
							label: module.title,
							value: module.id,
						})),
					},
				]}
			/>
		</div>
	);
};

export default AssignmentListItem;
