import React from "react";
import { Box, Typography } from "@mui/material";
import { styles } from "./HeaderStyle";

const Header = () => {
  return (
    <Box sx={styles.container}>
      <Typography variant="h4" component="h1" sx={styles.title}>
        Rick & Morty{" "}
        <span style={styles.highlight}>
          WiKi
        </span>
      </Typography>
    </Box>
  );
};

export default Header;
