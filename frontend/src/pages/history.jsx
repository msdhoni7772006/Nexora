
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(Array.isArray(history) ? history : []);
            } catch (error) {
                console.error("Failed to fetch meeting history:", error);
            }
        };

        fetchHistory();
    }, [getHistoryOfUser]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) {
            return "Unknown date";
        }

        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    return (
        <div>
            <IconButton
                aria-label="Go to home"
                onClick={() => routeTo("/home")}
            >
                <HomeIcon />
            </IconButton>

            {meetings.length > 0 ? (
                meetings.map((meeting, index) => (
                    <Card
                        key={meeting._id || `${meeting.meetingCode}-${index}`}
                        variant="outlined"
                        sx={{ mb: 2 }}
                    >
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Code: {meeting.meetingCode}
                            </Typography>

                            <Typography
                                sx={{ mb: 1.5 }}
                                color="text.secondary"
                            >
                                Date: {formatDate(meeting.date)}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography sx={{ p: 2 }}>
                    No meeting history available.
                </Typography>
            )}
        </div>
    );
}
