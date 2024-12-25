import React, { useState } from "react";
import { Button } from "@mui/material";
import { styles } from "./SortButtonStyle";

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
      sx={styles.button}
    >
      A dan Z ye Sırala ({isAscending ? "A-Z" : "Z-A"})
    </Button>
  );
};

export default SortButton;
