import { Card, CardContent, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Activity } from '../../../app/models/Activity';
import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';

interface Props {
    activity: Activity;
}

export default observer(function ActivityDetailedSidebar({ activity: { attendees, host } }: Props) {
    if (!attendees) return;
    return (
        <Card>
            <CardContent sx={{ p: 0, display: "flex", flexDirection: "column" }}>
                <Box sx={{ backgroundColor: "#1976D2", p: 1 }}>
                    <Typography variant="h6" align="center" color="white" >
                        {attendees.length} {attendees.length === 1 ? 'Person' : 'People'} Going
                    </Typography>
                </Box>
                <List>
                    {attendees.map(attendee => (
                        <ListItem key={attendee.username}>
                            <ListItemAvatar>
                                <Avatar sx={{ height: "55px", width: "55px" }} variant="square" src={attendee?.image} />
                            </ListItemAvatar>
                            <ListItemText sx={{ ml: 1 }}>
                                <Typography sx={{ textDecoration: "none" }} variant="body1" component={Link} to={`/profiles/${attendee.image}`}>
                                    {attendee.displayName}
                                </Typography>
                                <Fragment>
                                    {attendee.username === host?.username &&
                                        <Typography variant="body2" color="orange">Host</Typography>
                                    }
                                </Fragment>
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
})
