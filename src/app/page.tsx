import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';

export default function HomePage() {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f0f0f0', minHeight: '100vh', padding: 2 }}>
      <Navbar />
      <Dashboard />
    </Box>
  );
}
