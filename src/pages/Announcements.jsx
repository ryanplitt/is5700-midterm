import { Container, Box, Button, List } from "@mui/material";
import React, { useEffect, useState } from "react";
import AnnouncementListItem from "../components/AnnouncementListItem";
import { useApi } from "../apiV3";
import { EditingModal } from "../components/Modal";
import dayjs from "dayjs";

const Announcements = () => {
	const [announcements, setAnnouncements] = useState([]);
	const api = useApi("announcements");

	useEffect(() => {
		api.getAll().then((fetchedAnnouncements) => {
			setAnnouncements(
				fetchedAnnouncements.sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn))
			);
		});
	}, []);

	const [newAnnouncementOpen, setNewAnnouncementOpen] = useState(false);

	const handleCreateNew = () => {
		setNewAnnouncementOpen(true);
	};

	const handleSaveNewAnnouncement = async (updatedFields) => {
		const newAnnouncement = {
			...updatedFields,
			postedOn: dayjs(new Date()),
		};
		const newAnnouncementID = await api.create(newAnnouncement);
		console.log("Saved new announcement with ID", newAnnouncementID);

		setAnnouncements((prev) => [{ ...newAnnouncement, id: newAnnouncementID }, ...prev]);
		setNewAnnouncementOpen(false);
	};

	const handleDeleteAnnouncement = async (id) => {
		await api.delete(id);
		setAnnouncements((prev) => prev.filter((a) => a.id !== id));
	};

	const handleCloseNewAnnouncement = () => {
		setNewAnnouncementOpen(false);
	};

	return (
		<Container sx={{ width: "100%" }}>
			<>
				<Box display="flex" justifyContent="space-between" my={3}>
					<Box alignItems="left">
						<Button variant="contained" color="primary" onClick={handleCreateNew}>
							Create New
						</Button>
					</Box>
				</Box>

				<List sx={{ width: "100%" }}>
					{announcements.map((announcement, index) => (
						<AnnouncementListItem
							announcement={announcement}
							index={index}
							key={index}
							onSave={(announcement) => {
								setAnnouncements((prev) => {
									const newAnnouncements = [...prev];
									const index = newAnnouncements.findIndex((a) => a.id === announcement.id);
									newAnnouncements[index] = announcement;
									return newAnnouncements;
								});
							}}
							onDelete={handleDeleteAnnouncement}
						/>
					))}
				</List>

				<EditingModal
					open={newAnnouncementOpen}
					onClose={handleCloseNewAnnouncement}
					onSave={handleSaveNewAnnouncement}
					title="Create New Announcement"
					fields={[
						{ label: "Title", value: "", type: "text", name: "title" },
						{ label: "Description", value: "", type: "text", name: "description" },
					]}
				/>
			</>
		</Container>
	);
};

export default Announcements;
