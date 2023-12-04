import { observer } from "mobx-react-lite";
import { Profile } from "../../app/models/Profile";
import { Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

interface Props {
    profile: Profile;
}

export default observer(function ProfileCard({ profile }: Props) {
    return (
        <Card sx={{ maxWidth: "320px", maxHeight: "400px" }}>
            <CardMedia
                component={Link} to={`/profiles/${profile.username}`}
                sx={{ height: "200px" }}
                image={profile?.image || '/assets/user.png'}
                title={profile.displayName}
            />
            <CardContent>
                <Typography gutterBottom variant="h6">
                    {profile.displayName}
                </Typography>
                <Typography variant="body2" color="text.secondary"
                    sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
                >
                    {profile.bio}
                </Typography>
            </CardContent>
            <CardContent>
                <Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
                    <PeopleIcon /> {profile.followersCount + " follower"}
                </Typography>
            </CardContent>
            <CardActions>
                <FollowButton profile={profile} />
            </CardActions>
        </Card >
    )
})