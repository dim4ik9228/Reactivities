import { Card, CardContent, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ActivityDetailedSidebar() {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" align="center">
                    3 People Going
                </Typography>
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar src="/assets/user.png" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography sx={{ textDecoration: "none" }} variant="h6" component={Link} to="#">
                                    Bob
                                </Typography>
                            }
                            secondary={
                                <Typography variant="subtitle2">
                                    <span style={{ color: 'orange' }}>Host</span>
                                </Typography>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar src="/assets/user.png" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography sx={{ textDecoration: "none" }} variant="h6" component={Link} to="#">
                                    Tom
                                </Typography>
                            }
                            secondary={
                                <Typography variant="subtitle2">
                                    <span style={{ color: 'orange' }}>Following</span>
                                </Typography>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar src="/assets/user.png" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography sx={{ textDecoration: "none" }} variant="h6" component={Link} to="#">
                                    Sally
                                </Typography>
                            }
                        />
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    );
}
