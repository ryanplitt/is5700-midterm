import React from "react";
import SidebarLink from "./SidebarLink";

const SidebarNav = ({ isAuthenticated, userRole }) => {
	return (
		<aside className="menu">
			<i className={`fas fa-image`}></i>
			<i className={`fas fa-terminal`} style={{ marginLeft: "10px" }}></i>
			<p className="menu-label">CanvaScript</p>
			<ul className="menu-list">
				{isAuthenticated ? (
					<>
						<SidebarLink to="/home" icon="fa-home" label="Home" />
						<SidebarLink to="/syllabus" icon="fa-file-alt" label="Syllabus" />
						<SidebarLink to="/announcements" icon="fa-bullhorn" label="Announcements" />{" "}
						<SidebarLink to="/zoom" icon="fa-video" label="Zoom" />
						<SidebarLink to="/modules" icon="fa-th-list" label="Modules" />
						<SidebarLink to="/assignments" icon="fa-tasks" label="Assignments" />{" "}
						<SidebarLink to="/discussions" icon="fa-comments" label="Discussions" />{" "}
						<SidebarLink to="/grades" icon="fa-graduation-cap" label="Grades" />
						<SidebarLink to="/people" icon="fa-users" label="People" />
						<SidebarLink to="/search" icon="fa-search" label="Search" />
					</>
				) : (
					<SidebarLink to="/" icon="fa-home" label="Home" />
				)}
			</ul>
		</aside>
	);
};

export default SidebarNav;
