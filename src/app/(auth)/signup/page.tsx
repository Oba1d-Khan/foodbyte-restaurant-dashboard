"use client";

import React from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SignUpForm from "./form";

export default function SignUpPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
          }}
        >
          <Typography
            component="h1"
            variant={isSmallScreen ? "h5" : "h4"}
            sx={{
              mb: 3,
              color: "#1E3932",
              fontWeight: "bold",
            }}
          >
            FoodByte Sign Up
          </Typography>
          <SignUpForm />
        </Paper>
      </Box>
    </Container>
  );
}
