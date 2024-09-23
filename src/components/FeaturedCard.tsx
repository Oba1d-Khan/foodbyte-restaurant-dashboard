// FeaturedCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Divider } from '@mui/material';
import AddToCartButton from './AddToCartBtn';

interface FeaturedDealCardProps {
    title: string;
    subtitle?: string;
    description: string;
    price: string;
    originalPrice?: string;
    image: string;
}

export default function FeaturedCard({ title, subtitle, description, price, originalPrice, image }: FeaturedDealCardProps) {
    return (
        <Card sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 3, '&:hover': { transform: 'translateY(-8px)', transition: 'transform 0.3s ease-in-out' } }}>
            <CardMedia component="img" height="300" image={image} alt={title} sx={{ objectFit: 'cover' }} />
            <CardContent >
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {title}
                </Typography>
                {/* {subtitle && (
                    <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 1 }}>
                        {subtitle}
                    </Typography>
                )} */}
                <Typography variant="body1" color="textSecondary" sx={{ mb: 4, lineHeight: 0.5 }}>
                    {description}
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h5" color="primary" fontWeight="bold">
                            {price}
                        </Typography>
                        {originalPrice && (
                            <Typography variant="body2" sx={{ textDecoration: 'line-through', color: '#9e9e9e' }}>
                                {originalPrice}
                            </Typography>
                        )}
                    </Box>

                    <Box >
                        <AddToCartButton />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
