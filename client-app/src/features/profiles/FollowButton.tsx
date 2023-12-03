import { observer } from "mobx-react-lite";
import { Profile } from "../../app/models/Profile";
import { SyntheticEvent } from "react";
import { useStore } from "../../app/stores/store";
import { LoadingButton } from "@mui/lab";

interface Props {
    profile: Profile;
}

export default observer(function FollowButton({ profile }: Props) {
    const { profileStore, userStore } = useStore();
    const { updateFollowing, loading } = profileStore;

    if (userStore.user?.username === profile.username)
        return null;

    function handleFollow(e: SyntheticEvent, username: string) {
        e.preventDefault();
        profile.following ? updateFollowing(username, false) : updateFollowing(username, true);
    }

    return (
        <LoadingButton
            loading={loading}
            fullWidth
            variant="contained"
            color={profile.following ? 'error' : 'primary'}
            onClick={(e) => handleFollow(e, profile.username)}
        >
            {profile.following ? 'Unfollow' : 'Follow'}
        </LoadingButton>
    )
})