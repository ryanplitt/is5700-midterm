import React from "react";
import SidebarNav from "../SidebarNav";
import { Outlet } from "react-router-dom";

const Layout = ({ isAuthenticated, userRole }) => {
	return (
		<div className="layout">
			<div className="sidebar has-border">
				<SidebarNav isAuthenticated={isAuthenticated} userRole={userRole} />
			</div>

			<div className="main-content">
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
