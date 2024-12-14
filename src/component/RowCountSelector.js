import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";

const RowCountSelector = ({ onApplyRowCount }) => {
  const [inputValue, setInputValue] = useState(""); // Kullanıcı girişi
  const [error, setError] = useState(false); // Hata durumu

  const handleInputChange = (e) => {
    const value = e.target.value;

    // Sadece sayı girişine izin ver
    if (!/^\d*$/.test(value)) {
      setError(true);
    } else {
      setError(false);
      setInputValue(value);
    }
  };

  const handleApply = () => {
    // Eğer giriş geçerli değilse, hatayı göster
    if (!inputValue || isNaN(inputValue)) {
      setError(true);
      return;
    }
    setError(false);
    onApplyRowCount(parseInt(inputValue, 10)); // Satır sayısını gönder
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <TextField
        label="Satır Sayısı"
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
        error={error}
        helperText={error ? "Lütfen Bir Sayı Giriniz" : ""}
        sx={{
          marginBottom: 2,
          width: "250px", // Genişlik artırıldı
          backgroundColor: "#ffffff",
          borderRadius: 1,
          boxShadow: 2,
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleApply}
        sx={{
          marginBottom: 2,
          height: "56px", // TextField ile aynı yükseklik
          fontWeight: "400", // Daha hafif bir ağırlık
          padding: "0 25px", // Yatayda biraz boşluk
          width: "160px", // Button genişliği artırıldı
        }}
      >
        Uygula
      </Button>
    </Box>
  );
};

export default RowCountSelector;
