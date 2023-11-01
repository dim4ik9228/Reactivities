import { observer } from "mobx-react-lite";
import { Profile } from "../../app/models/Profile";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import { Link } from "react-router-dom";

interface Props {
    profile: Profile;
}

export default observer(function ProfileCard({ profile }: Props) {
    return (
        <Card sx={{ maxWidth: "320px" }}>
            <CardMedia
                component={Link} to={`/profiles/${profile.username}`}
                sx={{ height: 140 }}
                image={profile?.image || './assets/user.png'}
                title={profile.displayName}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">
                    {profile.displayName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Bio goes here
                </Typography>
            </CardContent>
            <CardContent>
                <Typography gutterBottom variant="h6">
                    <PeopleIcon /> 20 followers
                </Typography>
            </CardContent>
        </Card >
    )
})