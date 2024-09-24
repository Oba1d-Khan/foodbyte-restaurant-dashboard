import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { featuredDeals, exclusiveDeals } from '../constants/deals';
import FeaturedCard from './featured-card';
import FoodCard from './food-card';

const Dashboard:React.FC = () =>  {
    return (
        <Container maxWidth="lg" sx={{ mt: 6 }}>
            <Typography
                variant="h4"
                align="center"
                sx={{
                    mb: 6,
                    fontWeight: 'bold',
                    color: '#388e3c',
                    fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                }}
            >
                Featured Deals
            </Typography>

            <Grid container spacing={2}>
                {featuredDeals.map((deal, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <FeaturedCard {...deal} />
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 8, mb: 4 }}>
                <Typography
                    variant="h4"
                    align="center"
                    sx={{
                        bgcolor: '#388e3c', // Green
                        color: 'white',
                        py: 2,
                        borderRadius: 1,
                        fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                    }}
                >
                    Online Exclusive Deals
                </Typography>
            </Box>

            <Grid container spacing={2}>
                {exclusiveDeals.map((deal, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <FoodCard {...deal} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Dashboard;
