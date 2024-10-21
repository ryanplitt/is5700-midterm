import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { duration, easing, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarNav from "../SidebarNav";
import { Divider, Tooltip } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../useAuth0";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(({ theme }) => ({
	flexGrow: 1,
	padding: theme.spacing(3),
	transition: theme.transitions.create("margin", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginLeft: `-${drawerWidth}px`,
	variants: [
		{
			props: ({ open }) => open,
			style: {
				transition: theme.transitions.create("margin", {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
				marginLeft: 0,
			},
		},
	],
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	variants: [
		{
			props: ({ open }) => open,
			style: {
				width: `calc(100% - ${drawerWidth}px)`,
				marginLeft: `${drawerWidth}px`,
				transition: theme.transitions.create(["margin", "width"], {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
			},
		},
	],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

const Layout = () => {
	const [open, setOpen] = useState(true);
	const theme = useTheme();
	const location = useLocation();
	const auth = useAuth();
	const isAuthenticated = auth.isAuthenticated;
	const userRole = auth.user ? auth.user.role : "student";

	const toggleSidebar = () => {
		setOpen(!open);
	};

	const handleSignOut = () => {
		auth.logout();
	};

	const routeTitles = {
		"/home": "Home",
		"/syllabus": "Syllabus",
		"/announcements": "Announcements",
		"/zoom": "Zoom",
		"/modules": "Modules",
		"/assignments": "Assignments",
		"/discussions": "Discussions",
		"/people": "People",
		"/grades": "Grades",
		"/search": "Search",
		"/genericPage": "Generic Page",
		"/profile": "Profile",
	};

	const title = routeTitles[location.pathname] || "Home";

	return (
		<Box sx={{ display: "flex" }}>
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={toggleSidebar}
						edge="start"
						sx={{ mr: 2, ...(open && { display: "none" }) }}
					>
						<MenuIcon />
					</IconButton>

					<Typography variant="h6" noWrap component="div">
						{title}
					</Typography>

					<Box sx={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
						<Tooltip title="Profile" arrow>
							<IconButton color="inherit" component={Link} to="/profile">
								<AccountCircleIcon />
							</IconButton>
						</Tooltip>

						{isAuthenticated && (
							<Tooltip title="Sign Out" arrow>
								<IconButton color="inherit" onClick={handleSignOut}>
									<LogoutIcon />
								</IconButton>
							</Tooltip>
						)}
					</Box>
				</Toolbar>
			</AppBar>

			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<DrawerHeader>
					<IconButton onClick={toggleSidebar}>
						{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<SidebarNav
					isAuthenticated={isAuthenticated}
					userRole={userRole}
					toggleSidebar={toggleSidebar}
				/>
			</Drawer>

			<Main open={open}>
				<DrawerHeader />
				<Outlet sx={{ width: "100%" }} />
			</Main>
		</Box>
	);
};

export default Layout;
