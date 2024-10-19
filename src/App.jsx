import React from "react";
import "./App.css";
import Router from "./Router";

function App() {
	const isAuthenticated = true;
	const userRole = "admin";
	return <Router isAuthenticated={isAuthenticated} userRole={userRole} />;
}

export default App;
