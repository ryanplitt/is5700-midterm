import React from "react";
import "./App.css";
import Router from "./Router";
import { AuthProvider } from "./useAuth0";

function App() {
	return (
		<AuthProvider>
			<Router />
		</AuthProvider>
	);
}

export default App;
