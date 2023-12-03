import { Card, CardContent, Grid, Typography, List, ListItem, ListItemAvatar, Avatar, Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import TextInput from '../../../app/common/form/TextInput';
import { LoadingButton } from '@mui/lab';
import dayjs from 'dayjs';
import * as Yup from "yup";

interface Props {
    activityId: string;
}

export default observer(function ActivityDetailedChat({ activityId }: Props) {
    const { commentStore } = useStore();

    useEffect(() => {
        if (activityId) {
            commentStore.createHubConnection(activityId);
        }
        return () => {
            commentStore.clearComments();
        }
    }, [commentStore, activityId])

    return (
        <Card>
            <CardContent>
                <Grid container justifyContent="center" >
                    <Grid item xs={12} >
                        <Typography variant="h6" align="center" >
                            Chat about this event
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <List>
                            {
                                commentStore.comments.map(comment => (
                                    <ListItem key={comment.id} sx={{ display: "flex", alignItems:"flex-start" }}>
                                        <ListItemAvatar>
                                            <Avatar src={comment.image}
                                                component={Link} to={`/profiles/${comment.username}`} />
                                        </ListItemAvatar>
                                        <Box>
                                            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                                <Typography component={Link} to={`/profiles/${comment.username}`}
                                                    variant="subtitle1"
                                                >
                                                    {comment.displayName}
                                                </Typography>
                                                <Typography variant="subtitle2">{dayjs(comment.createdAt).format('dddd, DD/MM/YYYY HH:mm').toString()}</Typography>
                                            </Box>
                                            <Typography sx={{ whiteSpace: "pre-wrap" }} variant="body1">{comment.body}</Typography>
                                        </Box>
                                    </ListItem>
                                ))
                            }

                        </List>
                    </Grid>
                    <Grid item xs={12}>
                        <Formik
                            onSubmit={(values, { resetForm }) =>
                                commentStore.addComment(values).then(() => resetForm())}
                            initialValues={{ body: '' }}
                            validationSchema={Yup.object({
                                body: Yup.string().required()
                            })}
                        >
                            {({ isSubmitting, isValid }) => (
                                <Form>
                                    <TextInput name="body" placeholder='Add comment' ml />
                                    <LoadingButton
                                        loading={isSubmitting}
                                        disabled={isSubmitting || !isValid}
                                        variant="contained"
                                        type="submit"
                                    >
                                        Add comment
                                    </LoadingButton>
                                </Form>
                            )}
                        </Formik>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
})
