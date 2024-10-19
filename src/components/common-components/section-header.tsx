import React from "react";
import { Typography, Box } from "@mui/material";

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <Box sx={{ mt: 8, mb: 4, textAlign: "center" }}>
      <Typography
        variant="h4"
        sx={{
          bgcolor: "#248027",
          color: "white",
          fontWeight: "bold",
          py: 2,
          borderRadius: 1,
          fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default SectionHeader;
