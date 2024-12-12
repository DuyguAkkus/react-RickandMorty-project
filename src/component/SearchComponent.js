import React from "react";
import { TextField, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchComponent = ({ searchValue, onSearchChange }) => {
  return (
    <Box sx={{ marginBottom: 2, display: "flex", justifyContent: "center" }}>
      <TextField
        label="Search Characters"
        variant="outlined"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{
          width: "800px", // Tablo genişliği ile eşleştirildi
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
