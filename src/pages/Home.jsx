import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../useAuth0";

const Home = () => {
	const { isAuthenticated } = useAuth();

	return (
		<Container>
			<Typography variant="h4" component="h1" gutterBottom>
				Welcome to Our Application
			</Typography>
			<Box mb={2}>
				<Typography variant="body1">
					This is the public version of our homepage. Please login to access more features.
				</Typography>
			</Box>
			{isAuthenticated ? (
				<Box>
					<Box mb={2}>
						<Typography variant="body1">You are logged in!</Typography>
					</Box>
					<Button component={Link} to="/profile" variant="contained" color="primary">
						Profile
					</Button>
				</Box>
			) : (
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
			)}
		</Container>
	);
};

export default Home;
