import React from "react";
import { Box, Button, Typography } from "@mui/material";

const SpeciesFilter = ({
  speciesOptions,
  selectedSpecies,
  onSpeciesChange,
  onClearSpecies,
}) => {
  return (
    <Box
      sx={{
        marginBottom: 1,
        textAlign: "center",
        backgroundColor: "#f7f9fc",
        padding: 2,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      {/* Başlık */}
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "500" }}>
        Species
      </Typography>

      {/* Dikey Butonlar */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {speciesOptions.map((option) => (
          <Button
            key={option}
            onClick={() => onSpeciesChange(option)}
            variant={selectedSpecies === option ? "contained" : "outlined"}
            sx={{
              fontWeight: "400", // Daha hafif bir font ağırlığı
            }}
          >
            {option}
          </Button>
        ))}
      </Box>

      {/* Filtreleri Kaldır Butonu */}
      <Box sx={{ marginTop: 2 }}>
        <Button
          variant="text"
          color="secondary"
          onClick={onClearSpecies}
          sx={{
            fontSize: "0.9rem", // Butonu biraz daha küçük göster
            fontWeight: "400",
            textDecoration: "underline",
          }}
        >
          Clear Species
        </Button>
      </Box>
    </Box>
  );
};

export default SpeciesFilter;
