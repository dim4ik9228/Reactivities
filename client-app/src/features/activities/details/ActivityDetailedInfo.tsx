import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Activity } from '../../../app/models/Activity';
import InfoIcon from '@mui/icons-material/Info';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaceIcon from '@mui/icons-material/Place';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';

interface Props {
    activity: Activity;
}

export default observer (function ActivityDetailedInfo({ activity }: Props) {
    return (
        <Card sx={{ my: 2 }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <InfoIcon color="success" />
                    </Grid>
                    <Grid item xs={11}>
                        <Typography variant="body1">
                            {activity.description}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <CalendarMonthIcon color="success" />
                    </Grid>
                    <Grid item xs={11}>
                        <Typography variant="body1">
                            {dayjs(activity.date).format('dddd, DD/MM/YYYY HH:mm').toString()}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <PlaceIcon color="success" />
                    </Grid>
                    <Grid item xs={11}>
                        <Typography variant="body1">
                            {activity.venue}, {activity.city}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
})