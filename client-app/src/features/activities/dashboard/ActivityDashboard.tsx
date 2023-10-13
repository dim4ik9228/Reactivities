import { Box, Container, Grid, Stack } from "@mui/material";
import { Activity } from "../../../app/models/Activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityDashboard({ activities,
    selectedActivity,
    selectActivity,
    cancelSelectActivity,
    editMode,
    openForm,
    closeForm,
    createOrEdit,
    deleteActivity
}: Props) {
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Grid
                container
                justifyContent="center"
                alignContent="center"
                justifyItems="center"
                direction="row"
                spacing={4}
            >
                <Grid item xs={7}>
                    <Grid container direction="column" justifyContent="flex-end">
                        <Box
                            justifyContent="flex-end"
                            sx={{
                                backgroundColor: "white",
                                padding: "8px",
                                borderRadius: "10px",
                            }}
                        >
                            {activities.map((activity) => (
                                <Grid item xs={12} key={activity.id}>
                                    <ActivityList
                                        activity={activity}
                                        selectActivity={selectActivity}
                                        deleteActivity={deleteActivity}
                                    />
                                </Grid>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={5} sx={{ maxWidth: "428px" }}>
                    {selectedActivity && !editMode &&
                        <ActivityDetails
                            activity={selectedActivity}
                            cancelSelectActivity={cancelSelectActivity}
                            openForm={openForm}
                        />
                    }
                    {editMode &&
                        <ActivityForm
                            activity={selectedActivity}
                            closeForm={closeForm}
                            createOrEdit={createOrEdit} />
                    }
                </Grid>
            </Grid>
        </Container>
    )
}