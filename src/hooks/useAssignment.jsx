import { useState, useEffect } from "react";
import { useApi } from "../apiV3";

const useAssignment = () => {
	const api = useApi("assignments");
	const [assignments, setAssignments] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchAssignments = async () => {
			try {
				const fetchedAssignments = await api.getAll();
				setAssignments(fetchedAssignments);
			} catch (err) {
				setError(err);
			} finally {
				setIsLoading(false);
			}
		};
		fetchAssignments();
	}, []);

	const createAssignment = async (assignmentData) => {
		try {
			const newAssignmentId = await api.create(assignmentData);
			const newAssignment = { ...assignmentData, id: newAssignmentId };
			setAssignments((prevAssignments) => [newAssignment, ...prevAssignments]);
			return newAssignment;
		} catch (err) {
			setError(err);
			throw err;
		}
	};

	const updateAssignment = async (id, updatedFields) => {
		console.log("Updating Assignment:", id, updatedFields);

		if (!updatedFields) {
			console.error("Updated fields are undefined or null");
			return;
		}

		try {
			await api.update(id, updatedFields);
			setAssignments((prevAssignments) =>
				prevAssignments.map((assignment) =>
					assignment.id === id ? { ...assignment, ...updatedFields } : assignment
				)
			);
		} catch (err) {
			console.log("Something bad happened");
			setError(err);
			throw err;
		}
	};

	const deleteAssignment = async (id) => {
		try {
			await api.delete(id);
			setAssignments((prevAssignments) =>
				prevAssignments.filter((assignment) => assignment.id !== id)
			);
		} catch (err) {
			setError(err);
			throw err;
		}
	};

	return {
		assignments,
		isLoading,
		error,
		createAssignment,
		updateAssignment,
		deleteAssignment,
	};
};

export default useAssignment;
