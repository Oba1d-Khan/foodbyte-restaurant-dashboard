"use client";

import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import { useActionState } from "react";
import { signup } from "./actions";
import { useFormStatus } from "react-dom";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
} from "@mui/icons-material";
import Link from "next/link";

export default function SignUpForm() {
  const [state, signUpAction] = useActionState(signup, undefined);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box
      component="form"
      action={signUpAction}
      noValidate
      sx={{ mt: 1, width: "100%" }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
        error={!!state?.errors?.username}
        helperText={state?.errors?.username}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person sx={{ color: "#388e3c" }} />
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
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
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
        autoComplete="new-password"
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
          Already have an account?
          <Link href="/login" passHref>
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
              Login here
            </MuiLink>
          </Link>
        </Typography>
      </Box>
    </Box>
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
        "Sign Up"
      )}
    </Button>
  );
}
