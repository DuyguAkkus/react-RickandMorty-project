import React, { useState } from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { styles } from "./FilterComponentStyle";

const FilterComponent = ({
  title,
  options,
  selectedOption,
  onFilterChange,
  onClearFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

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
        sx={styles.title}
        onClick={toggleOpen}
      >
        {title}{" "}
        {isOpen ? (
          <FaChevronDown color="#1976D2" />
        ) : (
          <FaChevronRight color="#1976D2" />
        )}
      </Typography>

      {isOpen && (
        <Box
          sx={{
            ...styles.buttonContainer,
            flexDirection: isSmallScreen ? "row" : "column",
            gap: isSmallScreen ? 1 : 2,
            flexWrap: "wrap",
            justifyContent: isSmallScreen ? "center" : "flex-start",
          }}
        >
          {options.map((option) => (
            <Button
              key={option.value}
              onClick={() => onFilterChange(option.value)}
              variant={selectedOption === option.value ? "contained" : "outlined"}
              sx={{
                ...styles.filterButton,
                fontSize: isSmallScreen ? "0.6rem" : "0.9rem",
                padding: isSmallScreen ? "6px 10px" : "8px 14px",
              }}
            >
              {option.label}
            </Button>
          ))}
        </Box>
      )}

      {isOpen && (
        <Box sx={styles.clearButtonContainer}>
          <Button
            variant="text"
            color="secondary"
            onClick={onClearFilters}
            sx={{
              ...styles.clearButton,
              fontSize: isSmallScreen ? "0.8rem" : "1rem",
            }}
          >
            Clear Filters
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FilterComponent;
