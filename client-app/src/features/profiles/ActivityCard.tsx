import { observer } from "mobx-react-lite";
import { Activity } from "../../app/models/Activity";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import { Link } from "react-router-dom";

interface Props {
    activity: Activity;
}

export default observer(function ActivityCard({ activity }: Props) {

    return (
        <Card sx={{ maxWidth: "320px", maxHeight: "400px" }}
            component={Link} to={`/activities/${activity.id}`} >
            <CardMedia
                sx={{ height: "200px" }}
                image={`/assets/categoryImages/${activity.category}.jpg`}
                title={activity.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h6">
                    {activity.title}
                </Typography>
                <Typography variant="body2" color="text.secondary"
                    sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
                >
                    {activity.description}
                </Typography>
            </CardContent>
            <CardContent>
                <Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
                    <PeopleIcon sx={{ mr: 1 }} /> {activity.attendeesCount + " attendees"}
                </Typography>
            </CardContent>
        </Card >
    )
})