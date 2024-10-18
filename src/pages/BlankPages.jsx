import React from "react";

const BlankPage = (title) => {
	return () => (
		<section className="section">
			<div className="container">
				<h1 className="title">{title}</h1>
				<p>Welcome to the {title} page!</p>
			</div>
		</section>
	);
};

export const Syllabus = BlankPage("Syllabus");
export const Announcements = BlankPage("Announcements");
export const Zoom = BlankPage("Zoom");
export const Modules = BlankPage("Modules");
export const Assignments = BlankPage("Assignments");
export const Discussions = BlankPage("Discussions");
export const People = BlankPage("People");
export const Grades = BlankPage("Grades");
export const Search = BlankPage("Search");
