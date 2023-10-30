import { Box, Avatar, Popover } from "@mui/material"
import { observer } from "mobx-react-lite"
import { Profile } from "../../../app/models/Profile";
import { useState } from "react";
import ProfileCard from "../../profiles/ProfileCard";

interface Props {
    attendees: Profile[];
}

export default observer(function ActivityListItemAttendee({ attendees }: Props) {
    const [anchorElMap, setAnchorElMap] = useState<{ [key: string]: HTMLElement | null }>({});

    const handlePopoverOpen = (username: string, event: React.MouseEvent<HTMLElement>) => {
        setAnchorElMap(prevState => ({
            ...prevState,
            [username]: event.currentTarget,
        }));
    };

    const handlePopoverClose = (username: string) => {
        setAnchorElMap(prevState => ({
            ...prevState,
            [username]: null,
        }));
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
            }}>
            {attendees.map(attendee => (
                <div
                    key={attendee.username}
                    onMouseEnter={(e) => handlePopoverOpen(attendee.username, e)}
                    onMouseLeave={() => handlePopoverClose(attendee.username)}
                    style={{ position: 'relative' }}
                >
                    <Avatar alt="Remy Sharp" src={attendee?.image} />
                    <Popover
                        open={!!anchorElMap[attendee.username]}
                        anchorEl={anchorElMap[attendee.username]}
                        onClose={() => handlePopoverClose(attendee.username)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        style={{ pointerEvents: 'none' }}
                    >
                        <div>
                            <ProfileCard profile={attendee} />
                        </div>
                    </Popover>
                </div>
            ))}
        </Box>
    )
})
