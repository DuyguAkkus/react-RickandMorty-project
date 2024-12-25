import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { styles } from "./RowCountSelectorStyle";

const RowCountSelector = ({ onApplyRowCount }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) {
      setError(true);
    } else {
      setError(false);
      setInputValue(value);
    }
  };

  const handleApply = () => {
    if (!inputValue || isNaN(inputValue)) {
      setError(true);
      return;
    }
    setError(false);
    onApplyRowCount(parseInt(inputValue, 10));
  };

  return (
    <Box sx={styles.container}>
      <TextField
        label="Satır Sayısı"
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
        error={error}
        helperText={error ? "Lütfen Bir Sayı Giriniz" : ""}
        sx={styles.textField}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleApply}
        sx={styles.button}
      >
        Uygula
      </Button>
    </Box>
  );
};

export default RowCountSelector;
