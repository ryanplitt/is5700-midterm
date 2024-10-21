import React, { useEffect } from "react";
import "./App.css";
import Router from "./Router";
import { AuthProvider } from "./useAuth0";
import { useApi } from "./apiV3";
import dayjs from "dayjs";

function App() {
	useEffect(() => {
		loadInitialMockData();
	}, []);

	return (
		<AuthProvider>
			<Router />
		</AuthProvider>
	);
}

function loadInitialMockData() {
	const announcementApi = useApi("announcements");
	const announcements = [
		{
			title: "Welcome to the Course!",
			description: "This is a sample announcement.",
			postedOn: dayjs(new Date(2022, 9, 1)),
		},
		{
			title: "Assignment 1 ",
			description:
				"The deadline for Assignment 1 has been extended. You now have until Wednesday to complete it.",
			postedOn: dayjs(new Date(2022, 9, 15)),
		},
		{
			title: "Midterm Exam Date",
			description: "The midterm exam will be held.",
			postedOn: dayjs(new Date(2022, 9, 20)),
		},
	];
}

export default App;
