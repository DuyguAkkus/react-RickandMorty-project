import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingComponent = ({ isLoading, errorMessage }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh", // Yüksekliği ayarla
        gap: 2, // Elemanlar arası boşluk
      }}
    >
      {/* Eğer veri yükleniyorsa yükleme animasyonu */}
      {isLoading && (
        <>
          <CircularProgress color="primary" fontSize={60} />
          <Typography color="primary" variant="body1" fontSize={20}>
            Veriler Yükleniyor...
          </Typography>
        </>
      )}

      {/* Eğer hata varsa hata mesajı */}
      {errorMessage && (
        <Typography variant="body1" color="error">
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingComponent;
