import dayjs from 'dayjs';
import { Activity } from '../../../app/models/Activity';
import { Card, CardContent, Typography, Button, Box, Chip } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import { LoadingButton } from '@mui/lab';


interface Props {
    activity: Activity;
}


export default observer(function ActivityDetailedHeader({ activity }: Props) {
    const { activityStore: { updateAttendance, loading, cancelActivityToggle } } = useStore();

    return (
        <Card>
            <Box sx={{ position: "relative" }}>
                <img
                    src={`/assets/categoryImages/${activity.category}.jpg`}
                    alt="Activity"
                    style={{ width: '100%', objectFit: 'cover', filter: 'brightness(30%)' }}
                />
                {activity.isCanceled &&
                    <Chip color="error" label="Canceled" sx={{
                        position: 'absolute',
                        bottom: '85%',
                        left: '5%',
                    }} />
                }
                <Box sx={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '5%',
                    width: '100%',
                    height: 'auto',
                    color: 'white'
                }}>
                    <Typography variant="h5">
                        {activity.title}
                    </Typography>
                    <Typography variant="subtitle1" >
                        {dayjs(activity.date).format('dddd, DD/MM/YYYY HH:mm').toString()}
                    </Typography>
                    <Typography variant="subtitle1">
                        Hosted by <strong><Link to={`/profiles/${activity.host?.username}`}>{activity.host?.displayName}</Link></strong>
                    </Typography>
                </Box>
            </Box>

            <CardContent>
                {activity.isHost ? (
                    <>
                        <LoadingButton color={activity.isCanceled ? "success" : "error"}
                            variant="contained" onClick={cancelActivityToggle} loading={loading}>
                            {activity.isCanceled ? "Re-activate activity" : "Cancel activity"}
                        </LoadingButton>
                        <Button component={Link} to={`/manage/${activity.id}`}
                            variant="contained" color="warning"
                            disabled={activity.isCanceled}
                            sx={{ float: "right" }}>
                            Manage Event
                        </Button>
                    </>

                ) : activity.isGoing ? (
                    <LoadingButton loading={loading} onClick={updateAttendance}
                        disabled={activity.isCanceled}
                        variant="contained" color="inherit" sx={{ ml: 1 }}>
                        Cancel attendance
                    </LoadingButton>
                ) : (
                    <LoadingButton loading={loading} onClick={updateAttendance}
                        disabled={activity.isCanceled}
                        variant="contained" color="success">
                        Join Activity
                    </LoadingButton>
                )}



            </CardContent>
        </Card>
    );
})