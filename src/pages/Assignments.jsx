import React, { useState, useEffect } from "react";
import { Container, Box, Button, List } from "@mui/material";
import AssignmentListItem from "../components/AssignmentListItem";
import { EditingModal } from "../components/Modal";
import useAssignment from "../hooks/useAssignment";
import useModules from "../hooks/useModules";
import dayjs from "dayjs";

const Assignments = () => {
	const { assignments, createAssignment, updateAssignment, deleteAssignment } = useAssignment();
	const { modules } = useModules();
	const [newAssignmentOpen, setNewAssignmentOpen] = useState(false);

	const handleSaveNewAssignment = async (updatedFields) => {
		const newAssignment = {
			...updatedFields,
			postedOn: dayjs(new Date()),
		};
		await createAssignment(newAssignment);
		setNewAssignmentOpen(false);
	};

	const handleCloseNewAssignment = () => {
		setNewAssignmentOpen(false);
	};

	return (
		<Container sx={{ width: "100%" }}>
			<Box display="flex" justifyContent="space-between" my={3}>
				<Button variant="contained" color="primary" onClick={() => setNewAssignmentOpen(true)}>
					Create New Assignment
				</Button>
			</Box>

			<List sx={{ width: "100%" }}>
				{assignments.map((assignment, index) => (
					<AssignmentListItem
						key={index}
						assignment={assignment}
						index={index}
						onSave={updateAssignment}
						onDelete={deleteAssignment}
						modules={modules}
					/>
				))}
			</List>

			<EditingModal
				open={newAssignmentOpen}
				onClose={handleCloseNewAssignment}
				onSave={handleSaveNewAssignment}
				title="Create New Assignment"
				fields={[
					{ label: "Title", value: "", type: "text", name: "title" },
					{ label: "Description", value: "", type: "text", name: "description" },
					{ label: "Due Date", value: "", type: "date", name: "dueDate" },
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
		</Container>
	);
};

export default Assignments;
