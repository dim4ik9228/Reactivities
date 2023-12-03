import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Profile } from "../../app/models/Profile";
import ProfilePhotos from "./ProfilePhotos";
import TabPage from "../../app/common/tabPage/TabPage";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";
import { useStore } from "../../app/stores/store";

function allyProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface Props {
    profile: Profile;
}

export default observer(function ProfileContent({ profile }: Props) {
    const { profileStore } = useStore();

    const [value, setValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        profileStore.setActiveTab(newValue);
    };

    return (
        <Paper>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="About" {...allyProps(0)} />
                        <Tab label="Photos" {...allyProps(1)} />
                        <Tab label="Events" {...allyProps(2)} />
                        <Tab label="Followers" {...allyProps(3)} />
                        <Tab label="Following" {...allyProps(4)} />
                    </Tabs>
                </Box>
                <TabPage value={value} index={0}>
                    <ProfileAbout />
                </TabPage>
                <TabPage value={value} index={1}>
                    <ProfilePhotos profile={profile} />
                </TabPage>
                <TabPage value={value} index={2}>
                    <Typography>Events</Typography>
                </TabPage>
                <TabPage value={value} index={3}>
                    <ProfileFollowings />
                </TabPage>
                <TabPage value={value} index={4}>
                    <ProfileFollowings />
                </TabPage>
            </Box>
        </Paper>
    );
})