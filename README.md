# Overview

Hey there! This is CanvasMidterm (what I called Canvascript), a React app I built for my midterm project. It’s a platform that handles announcements, modules, assignments, and user management. I used Vite with SWC, and the UI is styled using **Material UI**. It’s designed for teachers to create content, and students to view it.

## What’s Done So Far

### Pages

	•	HomePage, LoginPage, RegisterPage, and ProfilePage are all up and running. The registration form uses Material UI and validates password matching in real-time.
	•	Announcements Page: Teachers can create, edit, delete, and view announcements. I used modals and Material UI components to make it easy for teachers to manage announcements.
	•	View your profile page (top right) to modify your access to be a teacher to see all the editing options. 

### Modules

	•	Teachers can create, edit, and delete modules.

### Assignments

	•	Assignments can be tied to modules. You can create, update, and delete them.
	•	Each assignment has a title, description, due date, and total points.

### Hooks & Context

	1.	useApi: Handles fetching, creating, updating, and deleting data.
	2.	useAssignment: Manages assignment state and makes it easy to use across the app.
	3.	useModules: Manages module state, and easy access to stored modules.
	4.	AuthProvider: Manages authentication for users, locking down certain pages for logged-in users only.


### Cool Stuff

	•	Calendar Page: Displays assignment due dates, and clicking on a date shows what’s due. A nice touch for keeping track of assignments.
	•	Grade Structure: Planned but not fully built yet.
