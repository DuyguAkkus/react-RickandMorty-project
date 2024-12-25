import React from "react";
import { TextField, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styles } from "./SearchComponentStyle";

const SearchComponent = ({ searchValue, onSearchChange }) => {
  return (
    <Box sx={styles.container}>
      <TextField
        label="Arama..."
        variant="outlined"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={styles.textField}
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
