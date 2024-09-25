'use client';
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, Box, Card, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';

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
        width: '6px',
    },
    '&::-webkit-scrollbar-track': {
        background: '#a1f7a5',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#388e3c',
        borderRadius: '10px',
        '&:hover': {
            backgroundColor: '#3cbb47',
        },
    },
};

const Navbar: React.FC = () => {
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
                ...scrollbarStyles,
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
                            margin: 2,
                            padding: 2,
                            boxShadow: 1,
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

                    <Link href="/cart" passHref>
                        <Button
                            sx={{
                                backgroundColor: 'white',
                                color: '#388e3c',
                                '&:hover': {
                                    backgroundColor: '#b4fab7',
                                    scale: '1.1',
                                },
                                border: '1px solid #388e3c',
                                borderRadius: '500px',
                                pl: 3,
                            }}
                            variant="outlined"
                            startIcon={<ShoppingCartIcon sx={{ color: '#388e3c', }} />}
                        >
                        </Button>
                    </Link>

                </Toolbar>
            </AppBar>
            <Drawer open={mobileOpen} onClose={handleDrawerToggle} sx={{ '& .MuiDrawer-paper': { width: 300 } }}>
                {drawer}
            </Drawer>
        </>
    );
}

export default Navbar;
