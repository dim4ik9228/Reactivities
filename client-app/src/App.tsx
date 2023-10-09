import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { List, Typography, styled } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';

function App() {
  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data)
      })
  }, [])

  return (
    <div>
      <header>
        <Typography sx={{ mb: 1 }} variant="h4" component="header">
          Reactivities
        </Typography>
      </header>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" component="h5">
            Activities List
          </Typography>
          <Typography sx={{ mb: 1 }} variant="body1" component="h5">
          <Demo>
            <List>
              {activities.map((activity: any) => (
                <ListItem key={activity.id} disablePadding>
                  {activity.title}
                </ListItem>
              ))}
            </List>
          </Demo>
        </Typography>
      </Grid>
    </Grid>
    </div >
  )
}

export default App
