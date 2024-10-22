import { useState, useEffect } from "react";
import { useApi } from "../apiV3";

const useModules = () => {
	const [modules, setModules] = useState([]);
	const api = useApi("modules");

	useEffect(() => {
		const fetchModules = async () => {
			const fetchedModules = await api.getAll();
			setModules(fetchedModules);
		};

		fetchModules();
	}, []);

	const createModule = async (moduleData) => {
		const newModuleId = await api.create(moduleData);
		const newModule = { ...moduleData, id: newModuleId };
		setModules((prevModules) => [newModule, ...prevModules]);
	};

	const updateModule = async (moduleId, updatedData) => {
		await api.update(moduleId, updatedData);
		setModules((prevModules) =>
			prevModules.map((mod) => (mod.id === moduleId ? { ...mod, ...updatedData } : mod))
		);
	};

	const deleteModule = async (moduleId) => {
		await api.delete(moduleId);
		setModules((prevModules) => prevModules.filter((mod) => mod.id !== moduleId));
	};

	return { modules, createModule, updateModule, deleteModule };
};

export default useModules;
