import { Box, Avatar } from "@mui/material"
import { observer } from "mobx-react-lite"
import { Profile } from "../../../app/models/Profile";
import { Link } from "react-router-dom";

interface Props {
    attendees: Profile[];
}

export default observer(function ActivityListItemAttendee({ attendees }: Props) {

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
            }}>
            {attendees.map(attendee => (
                <Box component={Link} to ={`profiles/${attendee.username}`}
                    key={attendee.username}
                    sx={{ position: 'relative' }}
                >
                    <Avatar alt="Remy Sharp" src={attendee?.image} />
                </Box>
            ))}
        </Box>
    )
})
