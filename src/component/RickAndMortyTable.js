import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid } from "@mui/material";
import FilterComponent from "./FilterComponent";
import SearchComponent from "./SearchComponent";
import CharacterDetailModal from "./CharacterDetailModal";
import RowCountSelector from "./RowCountSelector";
import Pagination from "./Pagination";
import CharacterTable from "./CharacterTable";
import SpeciesFilter from "./SpeciesFilter";
import SortButton from "./SortButton";
import LoadingComponent from "./ LoadingComponent";

const RickAndMortyTable = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage("");
    const apiURL = `https://rickandmortyapi.com/api/character/?page=${currentPage}`;
    axios
      .get(apiURL)
      .then((response) => {
        setCharacters(response.data.results);
        setFilteredCharacters(response.data.results);
        setTotalPages(response.data.info.pages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setErrorMessage(
          "API'ye erişilirken bir hata oluştu. Lütfen bağlantınızı kontrol edin veya daha sonra tekrar deneyin."
        );
        setIsLoading(false);
      });
  }, [currentPage]);

  useEffect(() => {
    let filtered = characters;

    if (searchValue) {
      filtered = filtered.filter((character) =>
        character.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(
        (character) => character.status === statusFilter
      );
    }

    if (genderFilter) {
      filtered = filtered.filter(
        (character) => character.gender === genderFilter
      );
    }

    if (speciesFilter) {
      filtered = filtered.filter(
        (character) => character.species === speciesFilter
      );
    }

    setFilteredCharacters(filtered);
  }, [statusFilter, genderFilter, speciesFilter, searchValue, characters]);

  const sortCharactersByName = (order) => {
    const sorted = [...filteredCharacters].sort((a, b) => {
      if (order === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setFilteredCharacters(sorted);
  };

  const handleRowClick = (character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
    setIsModalOpen(false);
  };

  const clearFilters = () => {
    setStatusFilter("");
    setGenderFilter("");
    setSpeciesFilter("");
    setSearchValue("");
  };

  if (isLoading || errorMessage) {
    return (
      <LoadingComponent isLoading={isLoading} errorMessage={errorMessage} />
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5", padding: 2 }}>
      <Grid container spacing={2}>
        {/* Filtreler Sol Tarafa */}
        <Grid item xs={12} sm={3} md={3}>
          <Box
            sx={{
              backgroundColor: "#ffffff",
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <FilterComponent
              title="Status"
              options={[
                { label: "Alive", value: "Alive" },
                { label: "Dead", value: "Dead" },
                { label: "Unknown", value: "unknown" },
              ]}
              selectedOption={statusFilter}
              onFilterChange={setStatusFilter}
              onClearFilters={clearFilters}
            />
            <FilterComponent
              title="Gender"
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
                { label: "Genderless", value: "Genderless" },
                { label: "Unknown", value: "unknown" },
              ]}
              selectedOption={genderFilter}
              onFilterChange={setGenderFilter}
              onClearFilters={clearFilters}
            />
            <SpeciesFilter
              speciesOptions={[
                "Human",
                "Alien",
                "Robot",
                "Mythological Creature",
              ]}
              selectedSpecies={speciesFilter}
              onSpeciesChange={setSpeciesFilter}
              onClearSpecies={() => setSpeciesFilter("")}
            />
          </Box>
        </Grid>

        {/* Sağ Taraf: Arama, Row Count, Sort ve Tablo */}
        <Grid item xs={12} sm={9} md={9}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="flex-start"
          >
            <Grid item xs={12} sm={6} md={6}>
              <SearchComponent
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                sx={{
                  flex: 1,
                  minWidth: "300px", // Genişliği arttırdık
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <RowCountSelector onApplyRowCount={setRowCount} />
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <SortButton onSort={sortCharactersByName} />
            </Grid>
          </Grid>

          <CharacterTable
            characters={filteredCharacters}
            onRowClick={handleRowClick}
            rowCount={rowCount}
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Grid>
      </Grid>

      {/* Detay Modal */}
      <CharacterDetailModal
        open={isModalOpen}
        onClose={handleCloseModal}
        character={selectedCharacter}
      />
    </Box>
  );
};

export default RickAndMortyTable;
