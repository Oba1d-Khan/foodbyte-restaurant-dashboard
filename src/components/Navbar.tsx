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
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import Link from "next/link";
import FoodItemModal from "@/src/components/add-foodItem-modal";
import { useCart } from "@/src/context/CartContext";

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
    backgroundColor: "#248027",
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
      textAlign="center"
      py={2}
      overflow="auto"
      height="100vh"
      bgcolor="#f5f5f5"
      sx={scrollbarStyles}
    >
      <Typography variant="h4" mb={2} color="#388e3c" fontWeight="semibold">
        CafeByte
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
                bgcolor: "transparent",
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
      <AppBar position="fixed" sx={{ backgroundColor: "#248027" }}>
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
            CafeByte
          </Typography>

          <Tooltip title="Chat with us on WhatsApp">
            <Link href="https://wa.me/+923151272630" passHref target="_blank">
              <Button
                variant="outlined"
                startIcon={<WhatsAppIcon sx={{ color: "#388e3c" }} />}
                sx={{
                  bgcolor: "white",
                  color: "#388e3c",
                  borderRadius: "500px",
                  borderColor: "#388e3c",
                  mr: 2,
                  "&:hover": {
                    bgcolor: "#b4fab7",
                    scale: "1.1",
                  },
                }}
              >
                Chat Now
              </Button>
            </Link>
          </Tooltip>

          <Tooltip title="Go to Cart">
            <Link href="/cart" passHref>
              <Button
                variant="outlined"
                startIcon={
                  <Badge badgeContent={cartItems.length} color="secondary">
                    <ShoppingCartIcon sx={{ color: "#388e3c" }} />
                  </Badge>
                }
                sx={{
                  bgcolor: "white",
                  color: "#388e3c",
                  borderRadius: "500px",
                  borderColor: "#388e3c",
                  pl: 3,
                  pr: 2,
                  mr: 2,
                  "&:hover": {
                    bgcolor: "#b4fab7",
                    scale: "1.1",
                  },
                }}
              />
            </Link>
          </Tooltip>
          <Tooltip title="Add New Food Item">
            <Button
              variant="outlined"
              onClick={() => setModalOpen(true)}
              sx={{
                bgcolor: "white",
                color: "#388e3c",
                borderRadius: "50px",
                borderColor: "#388e3c",
                "&:hover": {
                  bgcolor: "#b4fab7",
                  scale: "1.1",
                },
              }}
            >
              <AddBusinessIcon sx={{ color: "#388e3c" }} />
            </Button>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Drawer
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ "& .MuiDrawer-paper": { width: 300 } }}
      >
        {drawer}
      </Drawer>

      <FoodItemModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Navbar;
