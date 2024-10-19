import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
	Drawer,
	IconButton,
	AppBar,
	Toolbar,
	Typography,
	Box,
	CssBaseline,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarNav from "../SidebarNav";

const drawerWidth = 240;

const Layout = ({ isAuthenticated, userRole }) => {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const location = useLocation();

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	const getPageTitle = () => {
		return location.title || "Home";
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
			>
				<Toolbar>
					<Typography variant="h6" noWrap component="div">
						Permanent drawer
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
				variant="permanent"
				anchor="left"
			>
				<SidebarNav isAuthenticated={isAuthenticated} userRole={userRole} />
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
				<Toolbar />
				<Outlet />
			</Box>
		</Box>
	);

	<Box sx={{ display: "flex" }}>
		{/* <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}> */}
		<AppBar position="fixed">
			<Toolbar>
				<IconButton
					edge="start"
					color="inherit"
					aria-label="menu"
					onClick={toggleSidebar}
					sx={{ mr: 2 }}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" noWrap component="div">
					{getPageTitle()}
				</Typography>
			</Toolbar>
		</AppBar>

		<Drawer
			variant="persistent"
			anchor="left"
			open={sidebarOpen}
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
			}}
		>
			<SidebarNav isAuthenticated={isAuthenticated} userRole={userRole} />
		</Drawer>

		<Box
			component="main"
			sx={{
				flexGrow: 1,
				p: 3,
				ml: `${sidebarOpen ? `${drawerWidth}px` : "0"}`,
				transition: "margin 0.3s",
			}}
		>
			<Toolbar /> {/* To give padding under the AppBar */}
			<Outlet />
		</Box>
	</Box>;
};

export default Layout;
