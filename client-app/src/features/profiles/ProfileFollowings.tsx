import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import ProfileCard from "./ProfileCard";

export default observer(function ProfileFollowings() {
    const { profileStore } = useStore();
    const { profile, loadingFollowings, followings, activeTab } = profileStore;

    if (loadingFollowings) {
        return (
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "320px" }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h5">
                    {activeTab === 3 ? `People following ${profile?.displayName}` : `People ${profile?.displayName} is following`}
                </Typography>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1 }}>
                {followings.map(profile => (
                    <Grid key={profile.username} item xs={3}>
                        <ProfileCard profile={profile} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
})