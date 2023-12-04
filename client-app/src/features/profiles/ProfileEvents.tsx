import { Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Profile } from "../../app/models/Profile";
import ActivityCard from "./ActivityCard";

interface Props {
    profile: Profile;
}

export default observer(function ProfileEvents({ profile }: Props) {
    return (
        <Grid>
            <Grid container direction="row">
                <Grid item xs={12}>
                    <Typography variant="h5">Events</Typography>
                </Grid>
                <Grid container spacing={2}>
                    {
                        profile.activities.map(activity => (
                            <Grid item xs={4}>
                                <ActivityCard activity={activity} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}) 