import React from "react";
import { Box, Button } from "@mui/material";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pagesPerGroup = 5; // Her grupta gösterilecek sayfa sayısı
  const currentGroup = Math.ceil(currentPage / pagesPerGroup); // Şu anki grup
  const totalGroups = Math.ceil(totalPages / pagesPerGroup); // Toplam grup sayısı
  const startPage = (currentGroup - 1) * pagesPerGroup + 1; // Şu anki grubun başlangıç sayfası
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages); // Şu anki grubun bitiş sayfası

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        marginTop: 3,
        flexWrap: "wrap",
      }}
    >
      {/* Prev Group Button */}
      <Button
        variant="contained"
        color="primary"
        disabled={currentGroup === 1}
        onClick={() => handlePageChange(startPage - pagesPerGroup)}
      >
        Önceki
      </Button>

      {/* Page Numbers */}
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
        const page = startPage + index;
        return (
          <Button
            key={page}
            variant={page === currentPage ? "contained" : "outlined"}
            color={page === currentPage ? "primary" : "default"}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        );
      })}

      {/* Next Group Button */}
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
