import { Avatar, Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Profile } from "../../app/models/Profile";
import { observer } from "mobx-react-lite";

interface Props {
    profile: Profile;
}

export default observer(function ProfileCardHeader({ profile }: Props) {
    const [isFollowing, setIsFollowing] = useState(false);


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
                                <Typography variant="h2">5</Typography>
                                <Typography variant="h5">Followers</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", }}>
                                <Typography variant="h2">42</Typography>
                                <Typography variant="h5">Following</Typography>
                            </Box>
                        </Box>
                        <Button
                            fullWidth
                            variant="contained"
                            color={isFollowing ? 'error' : 'primary'}
                            onClick={() => setIsFollowing((prevFollowing) => !prevFollowing)}
                        >
                            {isFollowing ? 'Unfollow' : 'Follow'}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
});