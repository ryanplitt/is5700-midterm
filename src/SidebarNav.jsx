import React from "react";
import SidebarLink from "./SidebarLink";
import { useAuth } from "./useAuth0";

const SidebarNav = ({ toggleSidebar }) => {
	const auth = useAuth();
	const isAuthenticated = auth.user;

	return (
		<aside className="menu">
			<i className={`fas fa-image`}></i>
			<i className={`fas fa-terminal`} style={{ marginLeft: "10px" }}></i>
			<p className="menu-label">CanvaScript</p>
			<button className="button" onClick={toggleSidebar}>
				<span className="icon">
					<i className="fas fa-bars"></i>
				</span>
			</button>
			<ul className="menu-list">
				{isAuthenticated ? (
					<>
						<SidebarLink to="/" icon="fa-home" label="Home" />
						<SidebarLink to="/syllabus" icon="fa-file-alt" label="Syllabus" />
						<SidebarLink to="/announcements" icon="fa-bullhorn" label="Announcements" />{" "}
						<SidebarLink to="/zoom" icon="fa-video" label="Zoom" />
						<SidebarLink to="/modules" icon="fa-th-list" label="Modules" />
						<SidebarLink to="/assignments" icon="fa-tasks" label="Assignments" />{" "}
						<SidebarLink to="/discussions" icon="fa-comments" label="Discussions" />{" "}
						<SidebarLink to="/grades" icon="fa-graduation-cap" label="Grades" />
						<SidebarLink to="/people" icon="fa-users" label="People" />
						<SidebarLink to="/search" icon="fa-search" label="Search" />
						<SidebarLink to="/genericPage" icon="fa-cogs" label="Generic Page" />
						<SidebarLink to="/calendar" icon="fa-calendar" label="Calendar" />
					</>
				) : (
					<SidebarLink to="/" icon="fa-home" label="Home" />
				)}
			</ul>
		</aside>
	);
};

export default SidebarNav;
