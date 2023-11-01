import { Box, Paper, Typography } from "@mui/material";

interface Props {
    value: string;
}

export default function TabPage() {
    return (
        <Paper>
            <Box sx={{ p: 3, my: 4 }}>
                <Typography>About content</Typography>
            </Box>
        </Paper>
    )
}