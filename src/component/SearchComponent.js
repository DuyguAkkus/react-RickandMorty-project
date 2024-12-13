import React from "react";
import { TextField, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchComponent = ({ searchValue, onSearchChange }) => {
  return (
    <Box
      sx={{
        marginBottom: 2,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <TextField
        label="Arama..."
        variant="outlined"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{
          width: "700px", // Tablo genişliği ile eşleştirildi
          backgroundColor: "#ffffff", // Beyaz arka plan
          borderRadius: 1, // Köşeleri yuvarlat
          boxShadow: 2, // Hafif gölge efekti
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchComponent;
