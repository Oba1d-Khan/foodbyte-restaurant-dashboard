import React from 'react';
import { Card, CardMedia, Typography, Box, IconButton } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

interface ICartItemCardProps {
    title: string;
    description: string;
    price: string;
    originalPrice?: string;
    image: string;
    onRemove: () => void; // Function to handle item removal
}

const CartItemCard: React.FC<ICartItemCardProps> = ({
    title,
    description,
    price,
    originalPrice,
    image,
    onRemove,
}) => {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                overflow: 'hidden',
                padding: 2,
                boxShadow: 1,
                backgroundColor: '#ffffff',
                position: 'relative',
                '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.3s ease-in-out',
                },
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CardMedia
                    component="img"
                    sx={{ borderRadius: 1, width: '140px', height: '140px', objectFit: 'cover' }}
                    image={image}
                    alt={title}
                />
                <Box sx={{ flexGrow: 1, paddingLeft: 2 }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ color: '#757575', mb: 1 }}>
                        {description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
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
                </Box>
                <IconButton onClick={onRemove} sx={{ color: '#d32f2f' }}>
                    <RemoveCircleOutlineIcon />
                </IconButton>
            </Box>
        </Card>
    );
};

export default CartItemCard;
