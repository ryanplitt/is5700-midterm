import React, { useEffect, useState } from "react";
import "./App.css";
import Router from "./Router";
import { AuthProvider } from "./useAuth0";
import { useApi } from "./apiV3";
import dayjs from "dayjs";

function App() {
	const [loadedMockData, setLoadedMockData] = useState(false);

	useEffect(() => {
		if (!loadedMockData) {
			checkAndLoadMockData().then(() => {
				setLoadedMockData(true);
			});
		}
	}, [loadedMockData]);

	return (
		<AuthProvider>
			<Router />
		</AuthProvider>
	);
}

async function checkAndLoadMockData() {
	const announcementApi = useApi("announcements");
	const modulesApi = useApi("modules");
	const assignmentsApi = useApi("assignments");

	const existingAnnouncements = await announcementApi.getAll();
	const existingModules = await modulesApi.getAll();
	const existingAssignments = await assignmentsApi.getAll();

	if (
		existingAnnouncements.length === 0 ||
		existingModules.length === 0 ||
		existingAssignments.length === 0
	) {
		loadInitialMockData(announcementApi, modulesApi, assignmentsApi);
	}
}

function loadInitialMockData(announcementApi, modulesApi, assignmentsApi) {
	const announcements = [
		{
			title: "Welcome to the Course!",
			description: "This is a sample announcement.",
			postedOn: dayjs(new Date(2022, 9, 1)),
		},
		{
			title: "Assignment 1",
			description: "The deadline for Assignment 1 has been extended.",
			postedOn: dayjs(new Date(2022, 9, 15)),
		},
		{
			title: "Midterm Exam Date",
			description: "The midterm exam will be held.",
			postedOn: dayjs(new Date(2022, 9, 20)),
		},
	];

	announcementApi.bulkCreate(announcements);

	const mockModules = [
		{ id: 1, title: "Module 1" },
		{ id: 2, title: "Module 2" },
		{ id: 3, title: "Module 3" },
	];

	modulesApi.bulkCreate(mockModules);

	const mockAssignments = [
		{
			id: 1,
			title: "Assignment 1",
			description: "This is a basic assignment.",
			dueDate: dayjs().add(1, "day").format(),
			points: 100,
			moduleId: 1,
		},
		{
			id: 2,
			title: "Assignment 2",
			description: "Complete this assignment for points.",
			dueDate: dayjs().add(2, "day").format(),
			points: 100,
			moduleId: 1,
		},
		{
			id: 3,
			title: "Assignment 3",
			description: "Yet another assignment to finish.",
			dueDate: dayjs().add(4, "day").format(),
			points: 150,
			moduleId: 2,
		},
		{
			id: 4,
			title: "Assignment 4",
			description: "Don't forget to do this assignment.",
			dueDate: dayjs().add(5, "day").format(),
			points: 150,
			moduleId: 2,
		},
		{
			id: 5,
			title: "Assignment 5",
			description: "Just another regular assignment.",
			dueDate: dayjs().add(6, "day").format(),
			points: 200,
			moduleId: 3,
		},
		{
			id: 6,
			title: "Assignment 6",
			description: "Finish this one too.",
			dueDate: dayjs().add(7, "day").format(),
			points: 200,
			moduleId: 3,
		},
	];
	assignmentsApi.bulkCreate(mockAssignments);
}

export default App;
