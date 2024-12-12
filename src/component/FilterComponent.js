import React from "react";
import { Box, Button, Typography } from "@mui/material";

const FilterComponent = ({
  title,
  options,
  selectedOption,
  onFilterChange,
  onClearFilters, // Filtre temizleme fonksiyonu
}) => {
  return (
    <Box
      sx={{
        marginBottom: 2,
        textAlign: "center",
        backgroundColor: "#f7f9fc",
        padding: 2,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      {/* Başlık */}
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "500" }}>
        {title}
      </Typography>

      {/* Dikey Butonlar */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {options.map((option) => (
          <Button
            key={option.value}
            onClick={() => onFilterChange(option.value)}
            variant={selectedOption === option.value ? "contained" : "outlined"}
            sx={{
              fontWeight: "400", // Daha hafif bir font ağırlığı
            }}
          >
            {option.label}
          </Button>
        ))}
      </Box>

      {/* Filtreleri Kaldır Butonu */}
      <Box sx={{ marginTop: 2 }}>
        <Button
          variant="text"
          color="secondary"
          onClick={onClearFilters}
          sx={{
            fontSize: "0.9rem", // Butonu biraz daha küçük göster
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
