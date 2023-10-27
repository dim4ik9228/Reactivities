import dayjs from 'dayjs';
import { Activity } from '../../../app/models/Activity';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';


interface Props {
    activity: Activity;
}


export default observer(function ActivityDetailedHeader({ activity }: Props) {
    return (
        <Card>
            <Box sx={{ position: "relative" }}>
                <img
                    src={`/assets/categoryImages/${activity.category}.jpg`}
                    alt="Activity"
                    style={{ width: '100%', objectFit: 'cover', filter: 'brightness(30%)' }}
                />
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
                        Hosted by <strong>Bob</strong>
                    </Typography>
                </Box>
            </Box>

            <CardContent>
                <Button variant="contained" color="success">
                    Join Activity
                </Button>
                <Button variant="contained" color="inherit" sx={{ ml: 1 }}>
                    Cancel attendance
                </Button>
                <Button component={Link} to={`/manage/${activity.id}`} variant="contained" color="warning" sx={{ float: 'right' }}>
                    Manage Event
                </Button>
            </CardContent>
        </Card>
    );
})