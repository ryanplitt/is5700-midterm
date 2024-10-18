import React from "react";
import { NavLink } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const SidebarLink = ({ to, icon, label }) => {
	return (
		<li>
			<NavLink to={to} className={({ isActive }) => (isActive ? "is-active" : "")}>
				<i className={`fas ${icon}`} style={{ marginRight: "10px" }}></i>
				{label}
			</NavLink>
		</li>
	);
};

export default SidebarLink;
