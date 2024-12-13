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

  useEffect(() => {
    const apiURL = `https://rickandmortyapi.com/api/character/?page=${currentPage}`;
    axios
      .get(apiURL)
      .then((response) => {
        setCharacters(response.data.results);
        setFilteredCharacters(response.data.results);
        setTotalPages(response.data.info.pages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Grid container spacing={2} alignItems="flex-start">
        {/* Filtreler Sol Tarafa */}
        <Grid item xs={12} sm={4} md={3}>
          <Box
            sx={{
              backgroundColor: "#ffffff",
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
              marginBottom: 2, // Filtreleri tabloya daha yakın yapmak için
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

        {/* Tablo ve Butonlar Sağ Tarafa */}
        <Grid item xs={12} sm={8} md={9}>
          {/* Arama, Satır Sayısı ve Sıralama Butonları */}
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{ marginBottom: 2 }}
          >
            <Grid item xs={12} sm={5} md={6}>
              <SearchComponent
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                sx={{
                  width: "100%",
                  input: { fontSize: "1.2rem" },
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <RowCountSelector onApplyRowCount={setRowCount} />
            </Grid>
            <Grid item xs={6} sm={3} md={3} sx={{ textAlign: "right" }}>
              <SortButton onSort={sortCharactersByName} />
            </Grid>
          </Grid>

          {/* Tablo */}
          <CharacterTable
            characters={filteredCharacters}
            onRowClick={handleRowClick}
            rowCount={rowCount}
          />
        </Grid>
      </Grid>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

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
