import { Card, CardMedia, CardContent, Typography, Divider, CardActions, ButtonGroup, Button } from "@mui/material";
import { Activity } from "../../../app/models/Activity";

interface Props {
    activity: Activity;
    cancelSelectActivity: () => void;
    openForm: (id: string) => void
}

export default function ActivityDetails({ activity, cancelSelectActivity, openForm }: Props) {
    return (
        <Card sx={{ borderRadius: "10px", mb: 4 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={`./assets/categoryImages/${activity.category}.jpg`}
                title={activity.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {activity.title}
                </Typography>
                <Typography variant="body2">{activity.date}</Typography>
                <Typography variant="body2">{activity.description}</Typography>
            </CardContent>
            <Divider />
            <CardActions>
                <ButtonGroup
                    variant="outlined"
                    disableElevation
                    aria-label="outlined button group"
                    size="medium"
                    fullWidth
                >
                    <Button onClick={() => openForm(activity.id)}>Edit</Button>
                    <Button onClick={cancelSelectActivity}>
                        Cancel
                    </Button>
                </ButtonGroup>
            </CardActions>
        </Card>
    )
}