import React, { useState } from "react";
import { Button } from "@mui/material";

const SortButton = ({ onSort }) => {
  const [isAscending, setIsAscending] = useState(true);

  const handleSort = () => {
    const order = isAscending ? "asc" : "desc";
    setIsAscending(!isAscending);
    onSort(order);
  };

  return (
    <Button
      variant="outlined"
      onClick={handleSort}
      sx={{
        marginBottom: 2,
        marginLeft: "auto",
        fontSize: "0.4 rem",
        padding: "10px 20px",
        color: "#1976d2", // Mavi yazı rengi
        backgroundColor: "#f7f9fc", // Arka plan
        border: "1px solid #1976d2", // Mavi kenarlık
        borderRadius: "8px", // Yuvarlatılmış köşeler
        textTransform: "uppercase", // Büyük harf
        "&:hover": {
          backgroundColor: "#e3f2fd", // Hover arka plan rengi
        },
        height: "56px",
        width: "100%",
        maxWidth: "220px",
        "@media (max-width: 600px)": {
          fontSize: "0.775rem",
          padding: "8px 16px",
        },
      }}
    >
      A dan Z ye Sırala ({isAscending ? "A-Z" : "Z-A"})
    </Button>
  );
};

export default SortButton;
