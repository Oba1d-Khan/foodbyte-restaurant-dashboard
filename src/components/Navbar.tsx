"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  Box,
  Card,
  Tooltip,
  Button,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import FoodItemModal from "@/src/components/add-foodItem-modal";
import { useCart } from "@/src/context/CartContext"; // Correct path to your CartProvider
import { IFoodItem } from "@/src/types/IFoodItem";

const sections = [
  "Featured",
  "Burgers",
  "Sandwiches",
  "Wraps",
  "Fries",
  "Beverages",
  "Donuts",
  "Coffee",
  "Milkshakes",
  "Lemonades",
  "Teas",
  "Extra",
];

const scrollbarStyles = {
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#a1f7a5",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#388e3c",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: "#3cbb47",
    },
  },
};

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { cartItems } = useCart();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        py: 2,
        overflowY: "auto",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        ...scrollbarStyles,
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 2 }}
        color="#388e3c"
        fontWeight="semibold"
      >
        FoodMart
      </Typography>
      <List>
        {sections.map((section) => (
          <a
            key={section}
            href={`#${section}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              sx={{
                margin: 2,
                padding: 2,
                boxShadow: 1,
                backgroundColor: "transparent",
                "&:hover": {
                  boxShadow: 4,
                  transform: "scale(1.02)",
                  transition: "0.3s",
                },
              }}
            >
              <Typography variant="body1" align="center">
                {section}
              </Typography>
            </Card>
          </a>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#388e3c" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            FoodMart
          </Typography>

          {/* WhatsApp Button */}
          <Tooltip title="Chat with us on WhatsApp">
            <Link href="https://wa.me/+923151272630" passHref target="_blank">
              <Button
                sx={{
                  backgroundColor: "white",
                  color: "#388e3c",
                  "&:hover": {
                    backgroundColor: "#b4fab7",
                    scale: "1.1",
                  },
                  border: "1px solid #388e3c",
                  borderRadius: "500px",
                  mr: 2,
                }}
                variant="outlined"
                startIcon={<WhatsAppIcon sx={{ color: "#388e3c" }} />}
              >
                Chat Now
              </Button>
            </Link>
          </Tooltip>

          <Tooltip title="Go to Cart">
            <Link href="/cart" passHref>
              <Button
                sx={{
                  backgroundColor: "white",
                  color: "#388e3c",
                  "&:hover": {
                    backgroundColor: "#b4fab7",
                    scale: "1.1",
                  },
                  border: "1px solid #388e3c",
                  borderRadius: "500px",
                  pl: 3, // Padding left to keep the spacing
                  pr: 3, // Add padding right for symmetry
                  mr: 2, // Margin to the right to keep alignment
                }}
                variant="outlined"
                startIcon={
                  <Badge badgeContent={cartItems.length} color="secondary">
                    <ShoppingCartIcon sx={{ color: "#388e3c" }} />
                  </Badge>
                }
              />
            </Link>
          </Tooltip>

          {/* Add New Food Item Button */}
          <Tooltip title="Add New Food Item">
            <Button
              sx={{
                backgroundColor: "white",
                color: "#388e3c",
                "&:hover": {
                  backgroundColor: "#b4fab7",
                  scale: "1.1",
                },
                border: "1px solid #388e3c",
                borderRadius: "500px",
                pl: 3,
              }}
              variant="outlined"
              startIcon={<AddIcon sx={{ color: "#388e3c" }} />}
              onClick={() => setModalOpen(true)}
            />
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Menu */}
      <Drawer
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ "& .MuiDrawer-paper": { width: 300 } }}
      >
        {drawer}
      </Drawer>

      {/* Food Item Modal */}
      <FoodItemModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Navbar;
