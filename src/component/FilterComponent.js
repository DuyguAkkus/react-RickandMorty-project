import React, { useState } from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const FilterComponent = ({
  title,
  options,
  selectedOption,
  onFilterChange,
  onClearFilters, // Filtre temizleme fonksiyonu
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
        {title}{" "}
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
          {options.map((option) => (
            <Button
              key={option.value}
              onClick={() => onFilterChange(option.value)}
              variant={
                selectedOption === option.value ? "contained" : "outlined"
              }
              sx={{
                fontWeight: "400",
                fontSize: isSmallScreen ? "0.6rem" : "0.9rem", // Ekran boyutuna göre yazı boyutu
                padding: isSmallScreen ? "6px 10px" : "8px 14px", // Daha küçük ekranlarda daha küçük butonlar
                minWidth: "80px", // Genişliği daha dar tut
                minHeight: "30px", // Yüksekliği daha küçük yap
              }}
            >
              {option.label}
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
            onClick={onClearFilters}
            sx={{
              fontSize: isSmallScreen ? "0.8rem" : "1rem", // Daha küçük ekranlarda metin boyutunu küçült
              fontWeight: "300",
              textDecoration: "underline",
              padding: 0, // Ekstra boşlukları kaldır
              color: customBlueColor, // Clear Filters buton rengi
            }}
          >
            Clear Filters
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FilterComponent;
