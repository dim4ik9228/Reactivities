import { Divider, Paper, Typography, Button, Box } from "@mui/material";
import { Activity } from "../../../app/models/Activity";
import './fad.css'
import { LoadingButton } from "@mui/lab";
import { SyntheticEvent, useState } from "react";

interface Props {
    activity: Activity;
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean
}

export default function ActivityList({ activity,
    selectActivity,
    deleteActivity,
    submitting
}: Props) {
    const [target, setTarget] = useState('');

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Paper square elevation={0}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2
                }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <Typography className="ActivityTag" variant="body1">
                        {activity.title}
                    </Typography>
                    <Typography className="ActivityTag" variant="body1">
                        {activity.date}
                    </Typography>
                    <Typography className="ActivityTag" variant="body1">
                        {activity.description}
                    </Typography>
                    <Typography className="ActivityTag" variant="body1">
                        {activity.city}
                    </Typography>
                    <Typography
                        variant="button"
                        sx={{
                            border: "1px solid grey",
                            borderRadius: "6px",
                            m: "2px",
                            p: "4px",
                            alignSelf: "start",
                        }}
                    >
                        {activity.category}
                    </Typography>
                </Box>
                <Box sx={{ alignSelf: "end", display: "flex", gap: 1 }}>
                    <LoadingButton
                        name={activity.id}
                        className="viewListButton"
                        onClick={(e) => handleActivityDelete(e, activity.id)}
                        variant="contained"
                        disableElevation
                        color="error"
                        sx={{ borderRadius: "4px" }}
                        loading={submitting && target === activity.id}
                    >
                        Delete
                    </LoadingButton>
                    <Button
                        className="viewListButton"
                        onClick={() => selectActivity(activity.id)}
                        variant="contained"
                        disableElevation
                        sx={{ borderRadius: "4px" }}
                    >
                        View
                    </Button>
                </Box>
            </Box>
            <Divider variant="middle" />
        </Paper >
    )
}