import { Box } from "@mui/material";
import ProfileCardHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default observer(function ProfilePage() {
    const { username } = useParams();
    const { profileStore } = useStore();
    const { loadingProfile, loadProfile, profile, setActiveTab } = profileStore;

    useEffect(() => {
        if (username)
            loadProfile(username);
        return () => {
            setActiveTab(0);
        }

    }, [loadProfile, username, setActiveTab])

    if (loadingProfile)
        return <LoadingComponent />

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {profile &&
                <>
                    <ProfileCardHeader profile={profile} />
                    <ProfileContent profile={profile} />
                </>

            }
        </Box>
    )
})