import { Box } from "@mui/material";
import ProfileCardHeader from "./ProfileCardHeader";
import ProfileContent from "./ProfileContent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default observer(function ProfilePage() {
    const { username } = useParams();
    const { profileStore } = useStore();
    const { loadingProfile, loadProfile, profile } = profileStore;

    useEffect(() => {
        if (username)
            loadProfile(username);

    }, [loadProfile, username])

    if (loadingProfile)
        return <LoadingComponent />

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {profile &&
                <>
                    <ProfileCardHeader profile={profile} />
                    <ProfileContent profile={profile} index={0} value={0} />
                </>

            }
        </Box>
    )
})