import React from "react";

const Home = () => {
	return (
		<section className="section">
			<div className="container">
				<h1 className="title">Welcome to Our Application</h1>
				<p>This is the public version of our homepage. Please login to access more features.</p>
				<a href="/login" className="button is-primary">
					Login
				</a>
				<a href="/register" className="button is-link" style={{ marginLeft: "10px" }}>
					Register
				</a>
			</div>
		</section>
	);
};

export default Home;
