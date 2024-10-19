import React, { createContext, useContext, useMemo, useState } from "react";
import { useApi } from "./apiV3";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const api = useMemo(() => useApi({ tableName: "users" }), []);

	const login = async (email, password) => {
		setIsLoading(true);
		try {
			const validUser = await api.getByField("email", email);
			if (!validUser) {
				throw new Error("User not found");
			}
			if (validUser.password !== password) {
				throw new Error("Invalid password");
			}
			setUser(validUser);
			setIsAuthenticated(true);
		} catch (err) {
			setIsAuthenticated(false);
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};

	const register = async (email, password) => {
		console.log("Registering user:", email);
		if (email === "" || password === "") {
			setError("Email and password cannot be empty");
			return;
		}
		setIsLoading(true);
		try {
			const newUser = { email: email, password: password, role: "student" };
			const id = await api.create(newUser);
			setUser({ ...newUser, id: id });
			console.log("Making new user:", newUser, "with id:", id);
			setIsAuthenticated(true);
		} catch (err) {
			setIsAuthenticated(false);
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};

	const updateUser = async (id, user) => {
		console.log("Updating user:", user);
		setIsLoading(true);
		try {
			await api.update(user.id, user);
			setUser(user);
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		setUser(null);
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticated, isLoading, error, login, register, logout, updateUser }}
		>
			{children}
		</AuthContext.Provider>
	);
};
