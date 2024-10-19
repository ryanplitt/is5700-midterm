import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<Container maxWidth="sm">
			<Typography variant="h4" component="h1" gutterBottom>
				Welcome to Our Application
			</Typography>
			<Typography variant="body1" paragraph>
				This is the public version of our homepage. Please login to access more features.
			</Typography>
			<Box>
				<Button component={Link} to="/login" variant="contained" color="primary">
					Login
				</Button>
				<Button
					component={Link}
					to="/register"
					variant="outlined"
					color="primary"
					style={{ marginLeft: "10px" }}
				>
					Register
				</Button>
			</Box>
		</Container>
	);
};

export default Home;
