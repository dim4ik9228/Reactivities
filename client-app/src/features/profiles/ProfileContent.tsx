import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Profile } from "../../app/models/Profile";
import ProfilePhotos from "./ProfilePhotos";

interface Props {
    children?: React.ReactNode;
    index: number;
    value: number;
}


function TabPage(props: Props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            style={{ minHeight: "320px" }}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface Props {
    profile: Profile;
}

export default observer(function ProfileContent({ profile }: Props) {
    const [value, setValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Paper>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="About" {...a11yProps(0)} />
                        <Tab label="Photos" {...a11yProps(1)} />
                        <Tab label="Events" {...a11yProps(2)} />
                        <Tab label="Followers" {...a11yProps(3)} />
                        <Tab label="Following" {...a11yProps(4)} />
                    </Tabs>
                </Box>
                <TabPage value={value} index={0} profile={profile}>
                    <Typography>
                        {profile.bio ? profile.bio : "Profile bio is empty"}
                    </Typography>
                </TabPage>
                <TabPage value={value} index={1} profile={profile}>
                    <ProfilePhotos profile={profile} />
                </TabPage>
                <TabPage value={value} index={2} profile={profile}>
                    <Typography>Events</Typography>
                </TabPage>
                <TabPage value={value} index={3} profile={profile}>
                    <Typography>Followers</Typography>
                </TabPage>
                <TabPage value={value} index={4} profile={profile}>
                    <Typography>Following</Typography>
                </TabPage>
            </Box>
        </Paper>
    );
})