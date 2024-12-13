import React from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";

const FilterComponent = ({
  title,
  options,
  selectedOption,
  onFilterChange,
  onClearFilters, // Filtre temizleme fonksiyonu
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Küçük ekran kontrolü

  return (
    <Box
      sx={{
        marginBottom: 1,
        textAlign: "center",
        backgroundColor: "#f7f9fc",
        padding: isSmallScreen ? 1 : 2, // Ekran boyutuna göre iç boşluk
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      {/* Başlık */}
      <Typography
        variant={isSmallScreen ? "subtitle1" : "h6"} // Küçük ekranlarda daha küçük başlık
        gutterBottom
        sx={{ fontWeight: "500" }}
      >
        {title}
      </Typography>

      {/* Butonlar */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "row" : "column", // Küçük ekranlarda yatay düzen
          gap: 1,
          flexWrap: "wrap", // Küçük ekranlarda butonların taşmasını önler
          justifyContent: isSmallScreen ? "center" : "flex-start", // Küçük ekranlarda ortalama
        }}
      >
        {options.map((option) => (
          <Button
            key={option.value}
            onClick={() => onFilterChange(option.value)}
            variant={selectedOption === option.value ? "contained" : "outlined"}
            sx={{
              fontWeight: "400",
              fontSize: isSmallScreen ? "0.8rem" : "1rem", // Ekran boyutuna göre yazı boyutu
              padding: isSmallScreen ? "6px 12px" : "8px 16px", // Daha küçük ekranlarda daha küçük butonlar
              minWidth: isSmallScreen ? "70px" : "auto", // Küçük ekranlarda buton genişliği sabitlenir
            }}
          >
            {option.label}
          </Button>
        ))}
      </Box>

      {/* Filtreleri Kaldır Butonu */}
      <Box sx={{ marginTop: 1 }}>
        <Button
          variant="text"
          color="secondary"
          onClick={onClearFilters}
          sx={{
            fontSize: isSmallScreen ? "0.7rem" : "0.9rem", // Daha küçük ekranlarda metin boyutunu küçült
            fontWeight: "400",
            textDecoration: "underline",
          }}
        >
          Clear Filters
        </Button>
      </Box>
    </Box>
  );
};

export default FilterComponent;
