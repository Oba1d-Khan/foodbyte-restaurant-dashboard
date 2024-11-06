"use client";
import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, Card } from "@mui/material";
import { Link as ScrollLink } from "react-scroll";

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

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState("");
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop - 150) {
          setActiveSection(section);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (navbarRef.current) {
      const activeItem = navbarRef.current.querySelector(
        `[data-section="${activeSection}"]`
      );
      if (activeItem && navbarRef.current.scrollTo) {
        const itemPosition =
          (activeItem as HTMLElement).offsetLeft -
          navbarRef.current.clientWidth / 2;
        navbarRef.current.scrollTo({ left: itemPosition, behavior: "smooth" });
      }
    }
  }, [activeSection]);

  return (
    <Box
      ref={navbarRef}
      sx={{
        position: "sticky",
        top: 58,
        zIndex: 1000,
        backgroundColor: "white",
        display: "flex",
        padding: "14px 10px 6px 10px",
        width: "100%",
        overflowX: { xs: "auto", md: "hidden" },
        boxShadow: "0 6px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          height: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#1E3932",
          borderRadius: "10px",
        },
      }}
    >
      {sections.map((section) => (
        <ScrollLink
          key={section}
          to={section}
          smooth
          duration={500}
          spy
          offset={-140}
          style={{
            textDecoration: "none",
            margin: "0 10px",
            cursor: "pointer",
          }}
        >
          <Card
            data-section={section}
            sx={{
              padding: "10px 20px",
              backgroundColor:
                activeSection === section ? "#1E3932" : "transparent",
              color: activeSection === section ? "white" : "#1E3932",
              "&:hover": {
                backgroundColor: "#edfffa",
                color: "#1E3932",
              },
              transition: "background-color 0.3s ease, color 0.3s ease",
              borderRadius: "10px",
              boxShadow: "none",
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: "medium", letterSpacing: 1 }}
            >
              {section}
            </Typography>
          </Card>
        </ScrollLink>
      ))}
    </Box>
  );
};

export default Navbar;
