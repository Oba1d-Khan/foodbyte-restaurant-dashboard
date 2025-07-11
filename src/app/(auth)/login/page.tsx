"use client";

import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import { useActionState } from "react";
import { login } from "./actions";
import { useFormStatus } from "react-dom";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import Link from "next/link";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = React.useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { login: authLogin } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    // If login was successful (no errors and not pending), fetch user profile
    if (state && !state.errors) {
      (async () => {
        const res = await fetch("/api/profile", { method: "POST" });
        if (res.ok) {
          const data = await res.json();
          console.log("/api/profile response:", data);
          if (data && data.data) {
            authLogin({
              username: data.data.username,
              email: data.data.email,
              role: data.data.role,
            });
            console.log("Setting AuthContext with role:", data.data.role);
            // Optionally redirect or reload to show admin features
            router.refresh();
          }
        } else {
          console.log("/api/profile error:", res.status);
        }
      })();
    }
  }, [state]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
            FoodByte Login
          </Typography>
          <Box
            component="form"
            action={loginAction}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!state?.errors?.email}
              helperText={state?.errors?.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: "#388e3c" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#388e3c",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#388e3c",
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              error={!!state?.errors?.password}
              helperText={state?.errors?.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "#388e3c" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#388e3c",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#388e3c",
                },
              }}
            />
            <SubmitButton />
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2">
                Don&apos;t have an account?
                <Link href="/signup" passHref>
                  <MuiLink
                    component="span"
                    sx={{
                      pl: 1,
                      color: "#388e3c",
                      textDecoration: "none",
                      fontWeight: "medium",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Sign up here
                  </MuiLink>
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      disabled={pending}
      sx={{
        mt: 3,
        mb: 2,
        bgcolor: "#388e3c",
        color: "white",
        "&:hover": {
          bgcolor: "#1E3932",
          color: "#b4fab7",
        },
        borderRadius: "10px",
        padding: "10px",
        fontWeight: "bold",
      }}
    >
      {pending ? (
        <CircularProgress size={24} sx={{ color: "white" }} />
      ) : (
        "Login"
      )}
    </Button>
  );
}
