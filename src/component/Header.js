import React from "react";
import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{
        position: "sticky", // Sabit hale getirmek için
        top: 0, // Sayfanın üst kısmında sabitlenecek
        zIndex: 1000, // Diğer öğelerin üzerinde görünmesi için
        display: "flex",
        alignItems: "center",
        justifyContent: "center", // Yatayda ortalama
        backgroundColor: "#f5f5f5",
        padding: "20px",
        borderBottom: "2px solid #e0e0e0",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // Hafif gölge efekti
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontFamily: "'Ubuntu', sans-serif",
          fontWeight: "bold",
          color: "#000",
        }}
      >
        Rick & Morty{" "}
        <span
          style={{
            color: "#007bff", // Mavi renk
            fontWeight: "bold",
          }}
        >
          WiKi
        </span>
      </Typography>
    </Box>
  );
};

export default Header;
