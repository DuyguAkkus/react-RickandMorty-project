import React, { useState } from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { styles } from "./SpeciesFilterStyle";

const SpeciesFilter = ({
  speciesOptions,
  selectedSpecies,
  onSpeciesChange,
  onClearSpecies,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const customBlueColor = "#1976D2";

  return (
    <Box
      sx={{
        ...styles.container,
        padding: isSmallScreen ? 1 : 2,
      }}
    >
      <Typography
        variant={isSmallScreen ? "subtitle1" : "h6"}
        gutterBottom
        sx={{
          ...styles.title,
          color: customBlueColor,
        }}
        onClick={toggleOpen}
      >
        Species{" "}
        {isOpen ? (
          <FaChevronDown color={customBlueColor} />
        ) : (
          <FaChevronRight color={customBlueColor} />
        )}
      </Typography>

      {isOpen && (
        <Box
          sx={{
            ...styles.buttonContainer,
            flexDirection: isSmallScreen ? "row" : "column",
            gap: isSmallScreen ? 1 : 2,
            justifyContent: isSmallScreen ? "center" : "flex-start",
          }}
        >
          {speciesOptions.map((option) => (
            <Button
              key={option}
              onClick={() => onSpeciesChange(option)}
              variant={selectedSpecies === option ? "contained" : "outlined"}
              sx={{
                ...styles.filterButton,
                fontSize: isSmallScreen ? "0.6rem" : "0.9rem",
                padding: isSmallScreen ? "6px 10px" : "8px 14px",
              }}
            >
              {option}
            </Button>
          ))}
        </Box>
      )}

      {isOpen && (
        <Box sx={{ marginTop: 2 }}>
          <Button
            variant="text"
            color="secondary"
            onClick={onClearSpecies}
            sx={{
              ...styles.clearButton,
              fontSize: isSmallScreen ? "0.8rem" : "1rem",
              color: customBlueColor,
            }}
          >
            Clear Species
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SpeciesFilter;
