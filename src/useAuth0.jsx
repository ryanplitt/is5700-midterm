import React, { createContext, useContext, useMemo, useState } from "react";
import { useApi } from "./apiV3";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const api = useMemo(() => useApi({ tableName: "users" }), []);

	const isAuthenticated = useMemo(() => !!user, [user]);

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
		} catch (err) {
			setUser(null);
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
		} catch (err) {
			setUser(null);
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};

	const updateUser = async (id, user) => {
		console.log("Updating user:", user);
		setIsLoading(true);
		try {
			await api.update(id, user);
			setUser(user);
			console.log("Updated user:", user);
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		setUser(null);
	};

	const isTeacher = useMemo(() => user?.role === "teacher", [user]);

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				isLoading,
				error,
				login,
				register,
				logout,
				updateUser,
				isTeacher,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
