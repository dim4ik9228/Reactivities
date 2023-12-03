import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import { Profile } from "../../app/models/Profile";
import { observer } from "mobx-react-lite";
import FollowButton from "./FollowButton";

interface Props {
    profile: Profile;
}

export default observer(function ProfileHeader({ profile }: Props) {

    return (
        <Paper>
            <Grid container>
                <Grid item xs={8}>
                    <Box sx={{ height: "180px", pl: 2, display: "flex", alignItems: "center" }}>
                        <Avatar sx={{ height: "150px", width: "150px", mr: 2 }} src={profile.image} ></Avatar>
                        <Typography variant="h4">{profile.displayName}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ height: "180px", display: "flex", alignItems: "center", flexDirection: "column" }}>
                        <Box sx={{ display: "flex", justifyContent: "space-around", width: "100%", my: 1, mr: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <Typography variant="h2">{profile.followersCount}</Typography>
                                <Typography variant="h5">Followers</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", }}>
                                <Typography variant="h2">{profile.followingCount}</Typography>
                                <Typography variant="h5">Following</Typography>
                            </Box>
                        </Box>
                        <FollowButton profile={profile} />
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
});