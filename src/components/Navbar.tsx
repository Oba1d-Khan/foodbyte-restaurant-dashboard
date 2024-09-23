'use client'
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItemButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                FoodMart
            </Typography>
            <List>
                <ListItemButton>DELIVERY</ListItemButton>
                <ListItemButton>PICKUP</ListItemButton>
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#388e3c' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        FoodMart
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button color="inherit">DELIVERY</Button>
                        <Button color="inherit">PICKUP</Button>
                    </Box>
                    <IconButton color="inherit">
                        <AddShoppingCartIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer open={mobileOpen} onClose={handleDrawerToggle} sx={{ '& .MuiDrawer-paper': { width: 240 } }}>
                {drawer}
            </Drawer>
        </>
    );
}
