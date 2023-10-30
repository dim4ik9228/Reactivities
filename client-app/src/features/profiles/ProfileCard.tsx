import { observer } from "mobx-react-lite";
import { Profile } from "../../app/models/Profile";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';

interface Props {
    profile: Profile;
}

export default observer(function ProfileCard({ profile }: Props) {
    return (
        <Card sx={{ maxWidth: "320px" }}>
            <CardMedia
                sx={{ height: 140 }}
                image={profile.image}
                title={profile.displayName}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {profile.displayName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Bio goes here
                </Typography>
            </CardContent>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    <PeopleIcon /> 20 followers
                </Typography>
            </CardContent>
        </Card>
    )
})