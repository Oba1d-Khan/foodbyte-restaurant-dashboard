'use client'
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, Box, Card } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const sections = [
    'Burgers',
    'Fries',
    'Sandwiches',
    'Special Rolls',
    'Soup',
    'BBQ',
    'Milkshakes',
    'Cold Coffee',
    'Beverages',
    'Lemonades',
    'Extra'
];

const scrollbarStyles = {
    '&::-webkit-scrollbar': {
        width: '8px', // Width of the scrollbar
    },
    '&::-webkit-scrollbar-track': {
        background: '#f5f5f5', // Background of the track
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#388e3c', // Color of the scrollbar thumb
        borderRadius: '10px', // Roundness of the thumb
        '&:hover': {
            backgroundColor: '#3cbb47', // Color on hover
        },
    },
};

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box
            onClick={handleDrawerToggle}
            sx={{
                textAlign: 'center',
                py: 2,
                overflowY: 'auto',
                height: '100vh',
                backgroundColor: '#f5f5f5',
                ...scrollbarStyles, // Apply custom scrollbar styles
            }}
        >
            <Typography variant="h4" sx={{ mb: 2 }}>
                FoodMart
            </Typography>
            <List>
                {sections.map((section) => (
                    <Card
                        key={section}
                        sx={{
                            margin: 1,
                            padding: 4,
                            boxShadow: 2,
                            '&:hover': {
                                boxShadow: 4,
                                transform: 'scale(1.02)',
                                transition: '0.3s',
                            },
                        }}
                    >
                        <Typography variant="body1" align="center">
                            {section}
                        </Typography>
                    </Card>
                ))}
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
                    <Typography variant="h4" sx={{ flexGrow: 1 }}>
                        FoodMart
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer open={mobileOpen} onClose={handleDrawerToggle} sx={{ '& .MuiDrawer-paper': { width: 300 } }}>
                {drawer}
            </Drawer>
        </>
    );
}
