import React from "react";
import { Container, Typography } from "@mui/material";

const BlankPage = (title) => {
	return () => (
		<Container>
			<Typography variant="h4" component="h1" gutterBottom>
				{title}
			</Typography>
			<Typography variant="body1" paragraph>
				Welcome to the {title} page!
			</Typography>
		</Container>
	);
};

export const Syllabus = BlankPage("Syllabus");
export const Zoom = BlankPage("Zoom");
export const Modules = BlankPage("Modules");
export const Assignments = BlankPage("Assignments");
export const Discussions = BlankPage("Discussions");
export const People = BlankPage("People");
export const Grades = BlankPage("Grades");
export const Search = BlankPage("Search");
