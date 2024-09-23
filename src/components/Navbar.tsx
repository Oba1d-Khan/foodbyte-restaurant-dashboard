'use client'
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItemButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                redapple
            </Typography>
            <List>
                <ListItemButton>DELIVERY</ListItemButton>
                <ListItemButton>PICKUP</ListItemButton>
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#e53935' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        redapple
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button color="inherit">DELIVERY</Button>
                        <Button color="inherit">PICKUP</Button>
                    </Box>
                    <IconButton color="inherit">
                        <ShoppingCartIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer open={mobileOpen} onClose={handleDrawerToggle} sx={{ '& .MuiDrawer-paper': { width: 240 } }}>
                {drawer}
            </Drawer>
        </>
    );
}
