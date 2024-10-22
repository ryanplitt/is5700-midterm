import React, { useState } from "react";
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Button,
	Divider,
	List,
	ListItem,
	ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal, EditingModal } from "./Modal";
import dayjs from "dayjs";

const ModuleListItem = ({ moduleData, assignments, onSave, onDelete, onAddAssignment }) => {
	const [openDelete, setOpenDelete] = useState(false);
	const [openAssignmentModal, setOpenAssignmentModal] = useState(false);

	const handleDeleteClick = () => {
		setOpenDelete(false);
		onDelete(moduleData.id);
	};

	const handleCloseAssignmentModal = () => {
		setOpenAssignmentModal(false);
	};

	const handleSaveAssignment = async (newAssignment) => {
		await onAddAssignment(moduleData.id, newAssignment);
		setOpenAssignmentModal(false);
	};

	return (
		<div>
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography variant="h6" component="div">
						{moduleData.title}
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography variant="subtitle1" component="div">
						Assignments
					</Typography>
					<List>
						{assignments.map((assignment, index) => (
							<ListItem key={index}>
								<ListItemText
									primary={assignment.title}
									secondary={`Due: ${dayjs(assignment.dueDate).format("MMMM D, YYYY")} - Points: ${
										assignment.points
									}`}
								/>
							</ListItem>
						))}
					</List>
					<Button
						variant="outlined"
						color="primary"
						onClick={(e) => {
							e.stopPropagation();
							setOpenAssignmentModal(true);
						}}
					>
						Add Assignment
					</Button>
					<Divider />
					<Button
						variant="outlined"
						startIcon={<DeleteIcon />}
						onClick={(e) => {
							e.stopPropagation();
							setOpenDelete(true);
						}}
					>
						Delete Module
					</Button>
				</AccordionDetails>
			</Accordion>

			<Modal
				open={openDelete}
				onClose={() => setOpenDelete(false)}
				title="Delete Module"
				description="Are you sure you want to delete this module?"
				actions={[
					{ title: "Cancel", onClick: () => setOpenDelete(false) },
					{ title: "Delete", onClick: handleDeleteClick },
				]}
			/>

			<EditingModal
				open={openAssignmentModal}
				onClose={handleCloseAssignmentModal}
				onSave={handleSaveAssignment}
				title="Create New Assignment"
				fields={[
					{ label: "Title", name: "title", value: "", type: "text" },
					{ label: "Description", name: "description", value: "", type: "text" },
					{ label: "Total Points", name: "points", value: "", type: "number" },
					{ label: "Due Date", name: "dueDate", value: dayjs(), type: "date" },
					{
						label: "Module",
						name: "moduleId",
						value: "",
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

export default ModuleListItem;
