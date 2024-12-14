import React, { useState } from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { FaChevronDown, FaChevronRight } from "react-icons/fa"; // Doğru import

const SpeciesFilter = ({
  speciesOptions,
  selectedSpecies,
  onSpeciesChange,
  onClearSpecies,
}) => {
  const [isOpen, setIsOpen] = useState(false); // Açılır/Kapanır durum kontrolü
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Küçük ekran kontrolü

  const toggleOpen = () => {
    setIsOpen((prev) => !prev); // Aç/Kapat durumu değiştir
  };

  const customBlueColor = "#1976D2"; // Görseldeki mavi rengi temel alarak renk tanımlandı

  return (
    <Box
      sx={{
        marginBottom: 2,
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
        sx={{
          fontWeight: "500",
          cursor: "pointer", // Tıklanabilir gösterim
          userSelect: "none", // Seçilemez metin
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1, // İkon ve metin arasında boşluk
          color: customBlueColor, // Yazı ve ikon rengi
        }}
        onClick={toggleOpen} // Tıklanabilir hale getir
      >
        Species{" "}
        {isOpen ? (
          <FaChevronDown color={customBlueColor} />
        ) : (
          <FaChevronRight color={customBlueColor} />
        )}
      </Typography>

      {/* Butonlar - Açılır/Kapanır */}
      {isOpen && (
        <Box
          sx={{
            display: "flex",
            flexDirection: isSmallScreen ? "row" : "column", // Küçük ekranlarda yatay düzen
            gap: isSmallScreen ? 1 : 2, // Aralarındaki boşluğu artır
            flexWrap: "wrap", // Küçük ekranlarda butonların taşmasını önler
            justifyContent: isSmallScreen ? "center" : "flex-start", // Küçük ekranlarda ortalama
          }}
        >
          {speciesOptions.map((option) => (
            <Button
              key={option}
              onClick={() => onSpeciesChange(option)}
              variant={selectedSpecies === option ? "contained" : "outlined"}
              sx={{
                fontWeight: "400",
                fontSize: isSmallScreen ? "0.6rem" : "0.9rem", // Yazı boyutunu küçült
                padding: isSmallScreen ? "6px 10px" : "8px 14px", // Butonların boyutlarını ayarla
                minWidth: "80px", // Genişliği daralt
                minHeight: "30px", // Yüksekliği küçült
              }}
            >
              {option}
            </Button>
          ))}
        </Box>
      )}

      {/* Filtreleri Kaldır Butonu - Açıkken Göster */}
      {isOpen && (
        <Box sx={{ marginTop: 2 }}>
          <Button
            variant="text"
            color="secondary"
            onClick={onClearSpecies}
            sx={{
              fontSize: isSmallScreen ? "0.8rem" : "1rem", // Metin boyutunu ayarla
              fontWeight: "300",
              textDecoration: "underline",
              padding: 0, // Ekstra boşlukları kaldır
              color: customBlueColor, // Clear Filters buton rengi
            }}
          >
            Clear Species
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SpeciesFilter;
