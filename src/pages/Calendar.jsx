import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import useAssignment from "../hooks/useAssignment";
import useModules from "../hooks/useModules";

const CalendarPage = () => {
	const { assignments } = useAssignment();
	const { modules } = useModules();
	const [selectedDate, setSelectedDate] = useState(new Date());

	const getAssignmentsForDate = (date) => {
		return assignments.filter((assignment) => dayjs(assignment.dueDate).isSame(dayjs(date), "day"));
	};

	return (
		<Box sx={{ padding: 4 }}>
			<Typography variant="h4">Assignment Calendar</Typography>

			<Calendar
				onChange={setSelectedDate}
				value={selectedDate}
				tileContent={({ date, view }) => {
					if (view === "month") {
						const assignmentsForDate = getAssignmentsForDate(date);
						return assignmentsForDate.length > 0 ? (
							<Box>
								{assignmentsForDate.map((assignment, index) => (
									<Typography key={index} variant="caption" display="block">
										{assignment.title}
									</Typography>
								))}
							</Box>
						) : null;
					}
				}}
			/>

			<Box sx={{ marginTop: 4 }}>
				<Typography variant="h6">
					Assignments for {dayjs(selectedDate).format("MMMM D, YYYY")}
				</Typography>
				{getAssignmentsForDate(selectedDate).length > 0 ? (
					getAssignmentsForDate(selectedDate).map((assignment, index) => {
						const module = modules.find((mod) => mod.id === assignment.moduleId);
						return (
							<Typography key={index}>
								{module ? `${module.title}: ${assignment.title}` : assignment.title}
							</Typography>
						);
					})
				) : (
					<Typography>No assignments due on this date.</Typography>
				)}
			</Box>
		</Box>
	);
};

export default CalendarPage;
