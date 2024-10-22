import React, { useState } from "react";
import { ListItem, ListItemText, Typography, Divider, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal, EditingModal } from "./Modal";
import { useApi } from "../apiV3";
import dayjs from "dayjs";
import { useAuth } from "../useAuth0";

const AnnouncementListItem = ({ announcement, index, onSave, onDelete }) => {
	const [openDelete, setOpenDelete] = useState(false);
	const [openDetails, setOpenDetails] = useState(false);
	const api = useApi("announcements");
	const isTeacher = useAuth().isTeacher;

	const handleDeleteClick = () => {
		console.log("Deleting announcement");
		setOpenDelete(false);
		onDelete(announcement.id);
	};

	const handleCloseDelete = () => {
		setOpenDelete(false);
	};

	const handleCloseDetails = () => {
		setOpenDetails(false);
	};

	const handleSave = async (updatedFields) => {
		console.log("Saved fields:", updatedFields);
		console.log("Updated fields:", updatedFields);
		await api.update(announcement.id, updatedFields);
		console.log("api updated");
		const newAnnouncement = {
			...announcement,
			...updatedFields,
		};
		onSave(newAnnouncement);
		handleCloseDetails();
	};

	return (
		<div key={index}>
			<ListItem
				key={index}
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
					component="div"
					primary={
						<Typography variant="h6" component="div">
							{announcement.title}
						</Typography>
					}
					secondary={
						<>
							<Typography variant="body1" component="div">
								{announcement.description}
							</Typography>
							<Typography variant="caption" color="text.secondary" component="div">
								{dayjs(announcement.postedOn).format("MMMM D, YYYY")}
							</Typography>
						</>
					}
					disableTypography
				/>
			</ListItem>
			<Divider />

			<Modal
				open={openDelete}
				onClose={handleCloseDelete}
				title="Delete Announcement"
				description="Are you sure you want to delete this announcement?"
				actions={[
					{
						title: "Cancel",
						onClick: () => {
							console.log("Cancel delete");
							handleCloseDelete();
						},
					},
					{
						title: "Delete",
						onClick: () => {
							handleDeleteClick();
						},
					},
				]}
			/>

			<EditingModal
				open={openDetails}
				onClose={handleCloseDetails}
				onSave={handleSave}
				title={isTeacher ? "Edit Announcement" : "Announcement Details"}
				fields={[
					{ label: "Title", name: "title", value: announcement.title, type: "text" },
					{
						label: "Description",
						name: "description",
						value: announcement.description,
						type: "text",
					},
					{ label: "Posted On", name: "postedOn", value: announcement.postedOn, type: "date" },
				]}
			/>
		</div>
	);
};

export default AnnouncementListItem;
