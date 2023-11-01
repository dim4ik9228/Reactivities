import { Divider, Paper, Typography, Button, Box, Chip } from "@mui/material";
import { Activity } from "../../../app/models/Activity";
import './fad.css'
import { LoadingButton } from "@mui/lab";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import dayjs from "dayjs";
import ActivityListItemAttendee from "./ActivityListItemAttendee";

interface Props {
    activity: Activity;
}

export default observer(function ActivityList({ activity }: Props) {
    const { activityStore } = useStore();
    const { deleteActivity, loading } = activityStore;

    const [target, setTarget] = useState('');

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }


    return (
        <Paper>
            {activity.isCanceled &&
                <Chip color="error" label="Canceled" sx={{ mt: 1, ml: 2 }} />
            }
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    pt: 2, px: 2,
                }}>
                <Box sx={{
                    width: "100%"
                }}>
                    <Box sx={{ display: "flex", width: "100%", mb: 2 }}>
                        <span className="user-image">
                            <img src={activity.host?.image || "/assets/user.png"} alt="Host Image" />
                        </span>
                        <div>
                            <Typography className="ActivityTag" variant="h6">
                                {activity.title}
                            </Typography>
                            <Typography className="ActivityTag" variant="subtitle1">
                                Hosted by <Link to={`/profiles/${activity.host?.username}`}>{activity.host?.displayName}</Link>
                            </Typography>
                            {activity.isHost &&
                                <Box sx={{ border: "1px solid orange", p: 0.5 }}>
                                    <Typography color="orange" className="ActivityTag" variant="body2">
                                        You are hosting this activity
                                    </Typography>
                                </Box>
                            }
                            {activity.isGoing && !activity.isHost &&
                                <Box sx={{ border: "1px solid green", p: 0.5 }}>
                                    <Typography color="green" className="ActivityTag" variant="body2">
                                        You are going to this activity
                                    </Typography>
                                </Box>
                            }
                        </div>
                    </Box>
                    <Divider variant="middle" sx={{ my: "7px" }} />
                    <Box display="flex">
                        <AccessTimeIcon color="action" />
                        <Typography className="ActivityTag" variant="body1"
                            sx={{ ml: "4px" }}
                        >
                            {dayjs(activity.date).format('dddd, DD/MM/YYYY HH:mm').toString()}
                        </Typography>
                    </Box>
                    <Box display="flex">
                        <LocationOnIcon color="action" />
                        <Typography className="ActivityTag" variant="body1"
                            sx={{ ml: "4px" }}
                        >
                            {activity.city}, {activity.venue}
                        </Typography>
                    </Box>
                    <Box sx={{ backgroundColor: "#eaeaea", p: "10px", my: 2 }}>
                        <ActivityListItemAttendee attendees={activity.attendees!} />
                    </Box>
                    <Box >
                        <Typography className="ActivityTag" variant="body2" sx={{ mt: "10px" }}>
                            {activity.description}
                        </Typography>
                    </Box>

                </Box>
            </Box>

            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                px: 2, pb: 2
            }}>
                <Box sx={{ alignSelf: "end", display: "flex", gap: 1 }}>
                    <LoadingButton
                        name={activity.id}
                        className="viewListButton"
                        onClick={(e) => handleActivityDelete(e, activity.id)}
                        variant="contained"
                        disableElevation
                        color="error"
                        sx={{ borderRadius: "4px" }}
                        loading={loading && target === activity.id}
                    >
                        Delete
                    </LoadingButton>
                    <Button
                        component={Link} to={`/activities/${activity.id}`}
                        className="viewListButton"
                        variant="contained"
                        disableElevation
                        sx={{ borderRadius: "4px" }}
                    >
                        View
                    </Button>
                </Box>
            </Box>
        </Paper >
    )
})