import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import styles from "./LoadingComponentStyle";


const LoadingComponent = ({ isLoading, errorMessage }) => {
  return (
    <Box sx={styles.container}>
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
