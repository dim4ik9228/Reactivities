import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link, NavLink } from 'react-router-dom';
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { useStore } from '../stores/store';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';


export default observer(function NavBar() {
    const { userStore: { user, logout } } = useStore();

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="fixed" className="NavBar">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <MenuItem component={NavLink} to="/">
                        <img src="/assets/logo.png" alt="logo" style={{ height: '3em' }} />
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                ml: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Reactivities
                        </Typography>
                    </MenuItem>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button component={NavLink} to="/activities"
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Activities
                        </Button>
                        <Button component={NavLink} to="/errors"
                            sx={{ ml: 2, my: 2, color: 'white', display: 'block' }}
                        >
                            Errors
                        </Button>
                        <Button variant="contained" component={NavLink} to="/createActivity"
                            sx={{ ml: 2, my: 2, color: 'white', display: 'block' }}
                        >
                            Create Activity
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <Box
                                onClick={handleOpenUserMenu}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "10px",
                                    cursor: "pointer"
                                }}>
                                <IconButton sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src={user?.image} />
                                </IconButton>
                                <Typography>{user?.displayName}</Typography>
                            </Box>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem component={Link} to={`/profile/${user?.username}`} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">My Account</Typography>
                            </MenuItem>
                            <MenuItem onClick={logout}>
                                <Typography textAlign="center">Logout</Typography>

                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
})