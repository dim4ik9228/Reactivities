import { Avatar, Box, Button, Grid, Paper, Typography } from "@mui/material";

export default function ProfileCardHeader() {
    return (
        <Paper>
            <Grid container>
                <Grid item xs={8}>
                    <Box sx={{ height: "180px", pl: 2, display: "flex", alignItems: "center" }}>
                        <Avatar sx={{ height: "160px", width: "150px", mr: 2 }} src="./assets/user.png"></Avatar>
                        <Typography variant="h4">Displayname</Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ height: "180px", display: "flex", alignItems: "center", flexDirection: "column" }}>
                        <Box sx={{ display: "flex", justifyContent: "space-around", width: "100%", borderBottom: "1px solid grey", my: 1, mr: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <Typography variant="h2">5</Typography>
                                <Typography variant="h5">Followers</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", }}>
                                <Typography variant="h2">42</Typography>
                                <Typography variant="h5">Following</Typography>
                            </Box>
                        </Box>
                        <Box sx={{width: "100%", mr: 2}}>
                            <Button
                                sx={{ width: "100%"}}
                                variant="contained"
                                color={true ? "error" : "success"}>
                                {true ? "Unfollow" : "Follow"}
                            </Button>
                        </Box>
                    </Box>
                </Grid>

            </Grid>

        </Paper>
    )
}