import React, { useState } from "react";
import SidebarNav from "../SidebarNav";
import { Outlet, useLocation } from "react-router-dom";
import "./Layout.css";

const Layout = ({ isAuthenticated, userRole }) => {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const location = useLocation();

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	const getPageTitle = () => {
		return location.state?.title || "Home";
	};

	return (
		<div>
			<div className="title-bar">
				<button onClick={toggleSidebar} className="hamburger-button">
					<i className="fas fa-bars"></i>
				</button>
				<h1 className="page-title">{getPageTitle()}</h1>
			</div>

			<div className="layout-container">
				<div className={`sidebar ${sidebarOpen ? "" : "hidden"}`}>
					{
						<SidebarNav
							isAuthenticated={isAuthenticated}
							userRole={userRole}
							toggleSidebar={toggleSidebar}
						/>
					}
				</div>

				<div className="content">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Layout;
