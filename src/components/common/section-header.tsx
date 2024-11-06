import React from "react";
import { Typography, Box } from "@mui/material";

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <Box
      height={120}
      alignContent={"center"}
      sx={{
        mt: 10,
        mb: 4,
        textAlign: "center",
        backgroundImage: "url('/images/bg-doodle.png') ",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: "#D9E89A",
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h4"
        color="#1E3932"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default SectionHeader;
