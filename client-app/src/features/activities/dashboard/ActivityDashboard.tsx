import { Box, Container, Grid, Typography } from "@mui/material";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import ActivityFilter from "./ActivityFilter";

export default observer(function ActivityDashboard() {

    const { activityStore } = useStore();
    const { groupedActivities } = activityStore;

    return (
        <Container sx={{ mt: 4 }}>
            <Grid
                container
                justifyContent="center"
                alignContent="center"
                justifyItems="center"
                direction="row"
                spacing={4}
            >
                <Grid item xs={7}>
                    {groupedActivities.map(([group, activities]) => (
                        <Fragment key={group}>
                            <Grid container direction="column" justifyContent="flex-end">
                                <Typography variant="subtitle1"
                                    sx={{
                                        
                                        color: "teal"
                                    }}
                                >
                                    {group}
                                </Typography>
                                <Box
                                    justifyContent="flex-end"
                                    sx={{
                                        mb: "20px",
                                    }}
                                >
                                    {activities.map((activity) => (
                                        <Grid item xs={12} key={activity.id}>
                                            <ActivityList
                                                activity={activity}
                                            />
                                        </Grid>
                                    ))}
                                </Box>
                            </Grid>
                        </Fragment>
                    ))}

                </Grid>
                <Grid item xs={5}>
                    <ActivityFilter />
                </Grid>
            </Grid>
        </Container>
    )
})

