import {
	Container,
	Box,
	TextField,
	Button,
	List,
	ListItem,
	ListItemText,
	Typography,
	Divider,
} from "@mui/material";
import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Announcements = () => {
	const announcements = [
		{
			title: "Welcome to the Course!",
			description: "This is a sample announcement.",
			postedOn: "Posted on 2021-10-01",
		},
		{
			title: "Assignment 1 Deadline Extended",
			description: "The deadline for Assignment 1 has been extended to 2021-10-15.",
			postedOn: "Posted on 2021-10-05",
		},
		{
			title: "Midterm Exam Date",
			description: "The midterm exam will be held on 2021-10-20.",
			postedOn: "Posted on 2021-10-10",
		},
	];

	return (
		<Container>
			<Box display="flex" justifyContent="space-between" alignItems="center" my={3}>
				<Box sx={{ display: "flex", alignItems: "flex-end" }}>
					<i className={`fas fa-magnifying-glass`}></i>
					<TextField id="input-with-sx" placeholder="Search..." variant="standard" />
					<Button variant="contained" color="primary">
						Create New
					</Button>
				</Box>
			</Box>

			<List>
				{announcements.map((announcement, index) => (
					<div key={index}>
						<ListItem>
							<ListItemText
								primary={
									<Typography variant="h6" component="div">
										{announcement.title}
									</Typography>
								}
								secondary={
									<>
										<Typography variant="body2">{announcement.description}</Typography>
										<Typography variant="caption" color="text.secondary">
											{announcement.postedOn}
										</Typography>
									</>
								}
							/>
						</ListItem>
						{index < announcements.length - 1 && <Divider />}
					</div>
				))}
			</List>
		</Container>
	);
};

export default Announcements;
