"use client";
import { useAuth } from "@/src/context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Header from "../components/layout/Header";
import { CartProvider } from "@/src/context/CartContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <CartProvider>
      <Header />
      {children}
    </CartProvider>
  );
}
