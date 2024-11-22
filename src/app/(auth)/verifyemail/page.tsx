"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button, Typography, Box, CircularProgress } from "@mui/material";
import { useState } from "react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleVerifyEmail() {
    if (!token) {
      setError("Invalid token. Please try again.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/verifyemail", {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message);
        router.push("/");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
        padding: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Verify Your Email
      </Typography>
      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography variant="body2" color="success.main" sx={{ mb: 2 }}>
          {success}
        </Typography>
      )}
      {loading ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleVerifyEmail}
          sx={{ mt: 2 }}
        >
          Verify Email
        </Button>
      )}
    </Box>
  );
}
