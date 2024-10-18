import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import {
	Syllabus,
	Announcements,
	Zoom,
	Modules,
	Assignments,
	Discussions,
	People,
	Grades,
	Search,
} from "./pages/BlankPages";

function App() {
	const isAuthenticated = true; // TODO: Implement authentication
	const userRole = "admin"; // TODO: Implement authorization
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				<Route element={<Layout isAuthenticated={isAuthenticated} userRole={userRole} />}>
					<Route path="/" element={<Home />} />
				</Route>

				{isAuthenticated && (
					<Route element={<Layout isAuthenticated={isAuthenticated} userRole={userRole} />}>
						<Route path="/home" element={<Home />} />
						<Route path="/syllabus" element={<Syllabus />} />
						<Route path="/announcements" element={<Announcements />} />
						<Route path="/zoom" element={<Zoom />} />
						<Route path="/modules" element={<Modules />} />
						<Route path="/assignments" element={<Assignments />} />
						<Route path="/discussions" element={<Discussions />} />
						<Route path="/people" element={<People />} />
						<Route path="/grades" element={<Grades />} />
						<Route path="/search" element={<Search />} />
					</Route>
				)}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
