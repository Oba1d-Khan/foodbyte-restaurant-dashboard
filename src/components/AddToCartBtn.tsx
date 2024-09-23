import React from 'react';
import { Button, ButtonProps, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddToCartButton: React.FC<ButtonProps> = (props) => {
    return (
        <Tooltip title="Add to Cart" arrow>
            <Button
                variant="contained"
                color="#388e3c"
                sx={{
                    borderRadius: '50%',
                    minWidth: 48,
                    minHeight: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': {
                        backgroundColor: '#388e4d', // Darker shade on hover
                    },
                }}
                {...props} // Spread props to allow customization
            >
                <AddIcon fontSize="small" />
            </Button>
        </Tooltip>
    );
};

export default AddToCartButton;
