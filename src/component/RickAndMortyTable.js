import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
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
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/* Üst Alan */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <SearchComponent
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          sx={{
            flex: 1,
            minWidth: "250px",
          }}
        />
        <RowCountSelector onApplyRowCount={setRowCount} />
        <SortButton onSort={sortCharactersByName} />
      </Box>

      {/* Ana İçerik */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          flex: 1,
          overflowX: "auto",
        }}
      >
        {/* Sol Filtreler */}
        <Box
          sx={{
            flex: "0 0 300px",
            maxWidth: "300px",
            backgroundColor: "#ffffff",
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
            minHeight: "fit-content",
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

        {/* Sağ İçerik */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <CharacterTable
            characters={filteredCharacters}
            onRowClick={handleRowClick}
            rowCount={rowCount}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Box>
      </Box>

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
