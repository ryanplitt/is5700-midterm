import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Announcements from "./pages/Announcements";
import { Syllabus, Zoom, Discussions, People, Grades, Search } from "./pages/BlankPages";
import React from "react";
import GenericPage from "./pages/GenericPage";
import Profile from "./pages/Profile";
import Modules from "./pages/Modules";
import Assignments from "./pages/Assignments";
import Calendar from "./pages/Calendar";
import { useAuth } from "./useAuth0";
import { FormProvider } from "./FormProvider";
import { useNavigate } from "react-router-dom";

const Router = () => {
	const auth = useAuth();
	const isAuthenticated = auth.isAuthenticated;
	const userRole = auth.user ? auth.user.role : "student";

	return (
		<BrowserRouter>
			<Routes>
				{loginRoute()}
				{registerRoute()}

				<Route element={<Layout isAuthenticated={isAuthenticated} userRole={userRole} />}>
					<Route path="/" element={<Home />} />
				</Route>

				{isAuthenticated && (
					<Route
						element={<Layout isAuthenticated={isAuthenticated} userRole={userRole} title="Home" />}
					>
						<Route path="/" element={<Home />} />
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
						<Route path="/calendar" element={<Calendar />} title="Calendar" />
					</Route>
				)}
			</Routes>
		</BrowserRouter>
	);

	function registerRoute() {
		return (
			<Route
				path="/register"
				element={
					<FormProviderWrapper
						auth={auth.user}
						onSubmit={async (form) => {
							try {
								console.log("Registering user", form);
								await auth.register(form.email, form.password);
							} catch (error) {
								console.error("Error registering user", error);
							}
						}}
					>
						<Register />
					</FormProviderWrapper>
				}
			/>
		);
	}

	function loginRoute() {
		return (
			<Route
				path="/login"
				element={
					<FormProviderWrapper
						auth={auth.user}
						onSubmit={async (form) => {
							try {
								console.log("Logging in user", form);
								await auth.login(form.email, form.password);
							} catch (error) {
								console.error("Error logging in user", error);
							}
						}}
					>
						<Login />
					</FormProviderWrapper>
				}
			/>
		);
	}
};

const FormProviderWrapper = ({ user, onSubmit, children }) => {
	const navigate = useNavigate();

	return (
		<FormProvider
			onSubmit={async (form) => {
				await onSubmit(form);
				navigate("/");
			}}
			initial={{ ...user }}
		>
			{children}
		</FormProvider>
	);
};

export default Router;
