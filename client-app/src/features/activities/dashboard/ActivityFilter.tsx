import { Box, Divider, ListItemText, MenuItem, MenuList, Paper, Typography } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Calendar from "react-calendar";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityFilter() {
    const { activityStore: { predicate, setPredicate } } = useStore();

    return (
        <>
            <Paper sx={{ my: "27px" }}>
                <MenuList>
                    <Box sx={{ p: 1, display: "flex", }}>
                        <FilterAltIcon fontSize="small" sx={{ mx: 1 }} />
                        <Typography>Filters</Typography>
                    </Box>
                    <Divider />
                    <MenuItem
                        selected={predicate.has('all')}
                        onClick={() => setPredicate('all', 'true')}
                    >
                        <ListItemText>All activities</ListItemText>
                    </MenuItem>
                    <MenuItem
                        selected={predicate.has('isGoing')}
                        onClick={() => setPredicate('isGoing', 'true')}
                    >
                        <ListItemText>I'm going</ListItemText>
                    </MenuItem>
                    <MenuItem
                        selected={predicate.has('isHost')}
                        onClick={() => setPredicate('isHost', 'true')}
                    >
                        <ListItemText>I'm hosting</ListItemText>
                    </MenuItem>
                </MenuList>
            </Paper>
            <Calendar
                onChange={(date) => {
                    setPredicate('startDate', date as Date)
                }}
                value={predicate.get('startDate') ? predicate.get('startDate') : null}
            />
        </>

    )
})