import TextInput from "../TextInput";
import { Container } from "@mui/material";
import React from "react";
import { FormProvider } from "../FormProvider";

const GenericPage = () => {
	return (
		<Container>
			<FormProvider onSubmit={(data) => console.log(data)}>
				<TextInput name="title" />
				<TextInput name="description" multiline rows={5} />
			</FormProvider>
		</Container>
	);
};

export default GenericPage;
