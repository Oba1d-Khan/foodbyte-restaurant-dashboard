import React from 'react';
import { Button, ButtonProps } from '@mui/material';

export default function CustomButton(props: ButtonProps) {
    return (
        <Button
            {...props}
            size="small"
            variant="contained"
            color="error"
        />
    );
}