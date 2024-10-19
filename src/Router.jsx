import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Announcements from "./pages/Announcements";
import {
	Syllabus,
	Zoom,
	Modules,
	Assignments,
	Discussions,
	People,
	Grades,
	Search,
} from "./pages/BlankPages";
import React from "react";
import GenericPage from "./pages/GenericPage";
import Profile from "./pages/Profile";

const Router = ({ isAuthenticated, userRole }) => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				<Route element={<Layout isAuthenticated={isAuthenticated} userRole={userRole} />}>
					<Route path="/" element={<Home />} />
				</Route>

				{isAuthenticated && (
					<Route
						element={<Layout isAuthenticated={isAuthenticated} userRole={userRole} title="Home" />}
					>
						<Route path="/home" element={<Home />} />
						<Route path="/syllabus" element={<Syllabus />} title="Syllabus" />
						<Route path="/announcements" element={<Announcements />} title="Announcements" />
						<Route path="/zoom" element={<Zoom />} title="Zoom" />
						<Route path="/modules" element={<Modules />} title="Modules" />
						<Route path="/assignments" element={<Assignments />} title="Assignments" />
						<Route path="/discussions" element={<Discussions />} title="Discussions" />
						<Route path="/people" element={<People />} title="People" />
						<Route path="/grades" element={<Grades />} title="Grades" />
						<Route path="/search" element={<Search />} title="Search" />
						<Route path="/genericPage" element={<GenericPage />} title="Generic Page" />
						<Route path="/profile" element={<Profile />} title="Profile" />
					</Route>
				)}
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
