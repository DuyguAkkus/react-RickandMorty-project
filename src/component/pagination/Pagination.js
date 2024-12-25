import React from "react";
import { Box, Button } from "@mui/material";
import { styles } from "./PaginationStyle";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pagesPerGroup = 5;
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);
  const totalGroups = Math.ceil(totalPages / pagesPerGroup);
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <Box sx={styles.container}>
      <Button
        variant="contained"
        color="primary"
        disabled={currentGroup === 1}
        onClick={() => handlePageChange(startPage - pagesPerGroup)}
      >
        Önceki
      </Button>

      {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
        const page = startPage + index;
        return (
          <Button
            key={page}
            variant={page === currentPage ? "contained" : "outlined"}
            color={page === currentPage ? "primary" : "default"}
            onClick={() => handlePageChange(page)}
            sx={page === currentPage ? styles.button : {}}
          >
            {page}
          </Button>
        );
      })}

      <Button
        variant="contained"
        color="primary"
        disabled={currentGroup === totalGroups}
        onClick={() => handlePageChange(startPage + pagesPerGroup)}
      >
        Sonraki
      </Button>
    </Box>
  );
};

export default Pagination;
