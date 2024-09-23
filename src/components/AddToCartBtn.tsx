import React from 'react';
import { Button, ButtonProps } from '@mui/material';

const AddToCartButton: React.FC<ButtonProps> = () => {
    return (
        <Button
            variant="contained"
            color="primary"
            sx={{
                borderRadius: '50%',
                minWidth: 48,
                minHeight: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            +
        </Button>
    );
};

export default AddToCartButton;
