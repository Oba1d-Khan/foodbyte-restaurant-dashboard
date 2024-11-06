"use client";

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useActionState } from "react";
import { login } from "./actions";
import { useFormStatus } from "react-dom";

export default function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexDirection={"column"}
    >
      <Typography variant="h4" component="h1" fontWeight={"bold"} py={2}>
        Login
      </Typography>
      <Box
        component="form"
        action={loginAction}
        sx={{
          maxWidth: 300,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 6,
          border: 1,
          borderRadius: 1,
          borderColor: "grey.400",
        }}
      >
        <div>
          <input
            id="email"
            name="email"
            placeholder="Email"
            style={{
              padding: "8px",
              width: "100%",
              borderRadius: "4px",
              border: state?.errors?.email ? "1px solid red" : "1px solid #ccc",
            }}
          />
          {state?.errors?.email && (
            <Typography color="error" variant="body2">
              {state.errors.email}
            </Typography>
          )}
        </div>

        <div>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            style={{
              padding: "8px",
              width: "100%",
              borderRadius: "4px",
              border: state?.errors?.password
                ? "1px solid red"
                : "1px solid #ccc",
            }}
          />
          {state?.errors?.password && (
            <Typography color="error" variant="body2">
              {state.errors.password}
            </Typography>
          )}
        </div>

        <SubmitButton />
      </Box>
    </Box>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={pending}
      fullWidth
      sx={{ mt: 2 }}
    >
      {pending ? "Logging in..." : "Login"}
    </Button>
  );
}
