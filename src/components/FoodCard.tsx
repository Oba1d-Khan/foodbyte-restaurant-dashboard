import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import AddToCartButton from './AddToCartBtn';

interface ExclusiveDealCardProps {
    title: string;
    description: string;
    price: string;
    originalPrice?: string;
    discount?: string;
    image: string;
    onAddToCart: () => void;
}

export default function FoodCard({
    title,
    description,
    price,
    originalPrice,
    discount,
    image,
    onAddToCart,
}: ExclusiveDealCardProps) {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                overflow: 'hidden',
                padding: 2,
                boxShadow: 1,
                backgroundColor: '#f9f9f9',
                position: 'relative',
                '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.3s ease-in-out',
                },
            }}
        >
            {discount && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        backgroundColor: '#ff5722',
                        color: 'white',
                        padding: '0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                    }}
                >
                    {discount} OFF
                </Box>
            )}

            <Box sx={{ width: '100%' }}>
                <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid size={5}>
                        <CardMedia
                            component="img"
                            sx={{ borderRadius: 1, width: '140px', height: '140px', objectFit: 'cover' }}
                            image={image}
                            alt={title}
                        />
                    </Grid>

                    {/* Text Section */}
                    <Grid size={7}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                                {title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ color: '#757575', fontSize: '0.9rem', mb: 2 }}>
                                {description}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                                        {price}
                                    </Typography>
                                    {originalPrice && (
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                textDecoration: 'line-through',
                                                color: '#9e9e9e',
                                                fontSize: '0.85rem',
                                            }}
                                        >
                                            {originalPrice}
                                        </Typography>
                                    )}
                                </Box>

                                {/* Add To Cart Button */}
                                <AddToCartButton />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
}
