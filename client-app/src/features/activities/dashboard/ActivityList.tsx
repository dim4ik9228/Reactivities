import { Grid, Typography, Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { groupedActivities } = activityStore;

    return (
        <>
            {groupedActivities.map(([group, activities]) => (
                <Grid key={group} item>
                    <Typography variant="subtitle1" sx={{ color: "teal" }}>
                        {group}
                    </Typography>
                    <Box justifyContent="flex-end" sx={{ mb: "20px" }}>
                        {activities.map((activity) => (
                            <Grid item xs={12} key={activity.id}>
                                <ActivityListItem
                                    activity={activity}
                                />
                            </Grid>
                        ))}
                    </Box>
                </Grid>
            ))}
        </>
    )
})