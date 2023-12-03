import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useStore } from "../../app/stores/store";
import { Button, Grid, Typography } from "@mui/material";
import ProfileEditForm from "./ProfileEditForm";

export default observer(function ProfileAbout() {
    const { profileStore } = useStore();
    const { isCurrentUserProfileOwner, profile } = profileStore;
    const [editMode, setEditMode] = useState(false);

    return (
        <Grid>
            <Grid container direction="row">
                <Grid item xs={isCurrentUserProfileOwner ? 10 : 12}>
                    <Typography variant="h5">About</Typography>
                </Grid>
                {
                    isCurrentUserProfileOwner &&
                    <Grid item xs={2} sx={{ display: "flex", justifyContent: "flex-end" }} >
                        <Button
                            variant="outlined"
                            onClick={() => setEditMode(!editMode)}>
                            {editMode ? "Cancel" : "Edit Profile"}
                        </Button>
                    </Grid>
                }
                <Grid item xs={12}>
                    {
                        editMode ? <ProfileEditForm setEditMode={setEditMode} /> :
                            <Typography sx={{ whiteSpace: "pre-wrap" }}>
                                {profile!.bio ? profile!.bio : "Bio is empty"}
                            </Typography>
                    }
                </Grid>
            </Grid>
        </Grid>
    );
})