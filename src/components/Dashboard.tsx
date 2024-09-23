import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { featuredDeals, exclusiveDeals } from '../constants/deals';
import FeaturedCard from './FeaturedCard';
import FoodCard from './FoodCard';

export default function Dashboard() {
    return (
        <Container maxWidth="lg" sx={{ mt: 6 }}>
            {/* Featured Deals Section */}
            <Typography
                variant="h4"
                align="center"
                sx={{
                    mb: 6,
                    fontWeight: 'bold',
                    color: '#e53935',
                    fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                }}
            >
                Featured Deals
            </Typography>

            {/* Featured Deals Grid */}
            <Grid container spacing={2}>
                {featuredDeals.map((deal, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                        <FeaturedCard {...deal} />
                    </Grid>
                ))}
            </Grid>

            {/* Exclusive Deals Section */}
            <Box sx={{ mt: 8, mb: 4 }}>
                <Typography
                    variant="h4"
                    align="center"
                    sx={{
                        bgcolor: '#e53935',
                        color: 'white',
                        py: 2,
                        borderRadius: 1,
                        fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                    }}
                >
                    Online Exclusive Deals
                </Typography>
            </Box>

            {/* Exclusive Deals Grid */}
            <Grid container spacing={2}>
                {exclusiveDeals.map((deal, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                        <FoodCard {...deal} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
