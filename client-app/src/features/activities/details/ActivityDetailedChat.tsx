import { Card, CardContent, Grid, Typography, List, ListItem, ListItemAvatar, Avatar, TextField, Button, Divider, Box } from '@mui/material';
import { observer } from 'mobx-react-lite';

export default observer(function ActivityDetailedChat() {
    return (
        <Card>
            <CardContent>
                <Grid container justifyContent="center" >
                    <Grid item xs={12} >
                        <Typography variant="h6" align="center" >
                            Chat about this event
                        </Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar src="/assets/user.png" />
                                </ListItemAvatar>
                                <Box>
                                    <Box sx={{ display: "flex", gap: 1 }}>
                                        <Typography variant="subtitle1">Matt</Typography>
                                        <Typography variant="subtitle2" sx={{ mt: "3px", color: "grey" }}>Today at 5:42 PM</Typography>
                                    </Box>
                                    <Typography variant="body1">How artistic!</Typography>
                                    <Typography variant="body2" component="a" sx={{ color: "grey" }}>Reply</Typography>
                                </Box>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar src="/assets/user.png" />
                                </ListItemAvatar>
                                <Box>
                                    <Box sx={{ display: "flex", gap: 1 }}>
                                        <Typography variant="subtitle1">Joe Henderson</Typography>
                                        <Typography variant="subtitle2" sx={{ mt: "3px", color: "grey" }}>5 days ago</Typography>
                                    </Box>
                                    <Typography variant="body1">Dude this is awesome!</Typography>
                                    <Typography variant="body2" component="a" sx={{ color: "grey" }}>Reply</Typography>
                                </Box>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Add Reply"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} my="10px">
                        <Button
                            variant="contained"
                            color="primary"
                        >
                            Add Reply
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
})
