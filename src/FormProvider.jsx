import React, { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children, onSubmit, initial = {} }) => {
	const [form, setForm] = useState(initial);
	const [error, setError] = useState(null);

	const updateForm = (key, value) => {
		setForm((prevForm) => ({ ...prevForm, [key]: value }));
	};

	const handleSubmit = (e) => {
		onSubmit(form);
	};

	return (
		<FormContext.Provider value={{ form, updateForm, error, setError, handleSubmit }}>
			{children}
			{error && <p style={{ color: "red" }}>{error.message}</p>}
		</FormContext.Provider>
	);
};

export const useForm = () => {
	const context = useContext(FormContext);

	if (!context) {
		throw new Error("useForm must be used within a FormProvider");
	}

	return context;
};

export const useInput = (name) => {
	const { form, updateForm } = useForm();
	return {
		value: form[name] || "",
		onChange: (e) => updateForm(name, e.target.value),
	};
};

export const useNumberInput = (name) => {
	const { form, updateForm } = useForm();
	return {
		value: form[name] || "",
		name: name,
		onChange: (e) => updateForm(name, parseFloat(e.target.value)),
	};
};
