import React from "react";
import { Box } from "@mui/material";
import Dashboard from "../components/dashboard/Dashboard";
import Navbar from "../components/layout/Navbar";

export default function HomePage() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Dashboard />
    </Box>
  );
}
