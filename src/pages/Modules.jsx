import React, { useState } from "react";
import {
	Container,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Box,
	Button,
	List,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssignmentListItem from "../components/AssignmentListItem";
import { EditingModal } from "../components/Modal";
import useAssignment from "../hooks/useAssignment";
import useModules from "../hooks/useModules";
import dayjs from "dayjs";

const Modules = () => {
	const { assignments, createAssignment, updateAssignment, deleteAssignment } = useAssignment();
	const { modules, createModule, updateModule, deleteModule } = useModules();

	const [newModuleOpen, setNewModuleOpen] = useState(false);
	const [newAssignmentOpen, setNewAssignmentOpen] = useState(false);
	const [selectedModule, setSelectedModule] = useState(null);

	const getAssignmentsForModule = (moduleId) => {
		return assignments.filter((assignment) => assignment.moduleId === moduleId);
	};

	const handleSaveNewModule = async (updatedFields) => {
		await createModule(updatedFields);
		setNewModuleOpen(false);
	};

	const handleSaveNewAssignment = async (updatedFields) => {
		const newAssignment = {
			...updatedFields,
			moduleId: selectedModule.id,
			postedOn: dayjs(new Date()),
		};
		await createAssignment(newAssignment);
		setNewAssignmentOpen(false);
	};

	const handleCloseNewModule = () => {
		setNewModuleOpen(false);
	};

	const handleCloseNewAssignment = () => {
		setNewAssignmentOpen(false);
		setSelectedModule(null);
	};

	return (
		<Container>
			<Box display="flex" justifyContent="space-between" my={3}>
				<Button variant="contained" color="primary" onClick={() => setNewModuleOpen(true)}>
					Create New Module
				</Button>
			</Box>

			{modules.map((module, index) => (
				<Accordion key={index}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<Typography variant="h6" component="div">
							{module.title}
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								setSelectedModule(module);
								setNewAssignmentOpen(true);
							}}
						>
							Add Assignment
						</Button>
						<List>
							{getAssignmentsForModule(module.id).map((assignment, idx) => (
								<AssignmentListItem
									key={idx}
									assignment={assignment}
									index={idx}
									onSave={updateAssignment}
									onDelete={deleteAssignment}
								/>
							))}
						</List>
					</AccordionDetails>
				</Accordion>
			))}

			{/* Modal for creating a new module */}
			<EditingModal
				open={newModuleOpen}
				onClose={handleCloseNewModule}
				onSave={handleSaveNewModule}
				title="Create New Module"
				fields={[{ label: "Module Title", value: "", type: "text", name: "title" }]}
			/>

			{/* Modal for creating a new assignment */}
			<EditingModal
				open={newAssignmentOpen}
				onClose={handleCloseNewAssignment}
				onSave={handleSaveNewAssignment}
				title={`Create New Assignment for ${selectedModule?.title || "Module"}`}
				fields={[
					{ label: "Title", value: "", type: "text", name: "title" },
					{ label: "Description", value: "", type: "text", name: "description" },
					{ label: "Due Date", value: "", type: "date", name: "dueDate" },
				]}
			/>
		</Container>
	);
};

export default Modules;
