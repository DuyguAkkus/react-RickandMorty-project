import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid,
} from "@mui/material";
import FilterComponent from "./component/FilterComponent";
import SearchComponent from "./component/SearchComponent";

const RickAndMortyTable = () => {
  const [characters, setCharacters] = useState([]); // Tüm karakterler
  const [filteredCharacters, setFilteredCharacters] = useState([]); // Filtrelenmiş karakterler
  const [statusFilter, setStatusFilter] = useState(""); // Seçilen durum filtresi
  const [genderFilter, setGenderFilter] = useState(""); // Seçilen cinsiyet filtresi
  const [searchValue, setSearchValue] = useState(""); // Arama kutusu değeri

  // API'den veri çekme
  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((response) => {
        setCharacters(response.data.results); // Tüm karakterleri kaydet
        setFilteredCharacters(response.data.results); // Başlangıçta tüm karakterleri göster
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Filtreleme işlemi
  useEffect(() => {
    let filtered = characters;

    // Arama filtresi
    if (searchValue) {
      filtered = filtered.filter((character) =>
        character.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Durum filtresi
    if (statusFilter) {
      filtered = filtered.filter(
        (character) => character.status === statusFilter
      );
    }

    // Cinsiyet filtresi
    if (genderFilter) {
      filtered = filtered.filter(
        (character) => character.gender === genderFilter
      );
    }

    setFilteredCharacters(filtered);
  }, [statusFilter, genderFilter, searchValue, characters]);

  // Filtreleri Temizleme Fonksiyonu
  const clearFilters = () => {
    setStatusFilter(""); // Durum filtresini temizle
    setGenderFilter(""); // Cinsiyet filtresini temizle
    setSearchValue(""); // Arama filtresini temizle
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      {/* Arama Kutusu */}
      <SearchComponent
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

      {/* Grid Yapısı */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {/* Sol Filtreler */}
        <Grid item xs={12} sm={4} md={3}>
          <Box
            sx={{
              backgroundColor: "#ffffff",
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            {/* Filtre Bileşeni - Status */}
            <FilterComponent
              title="Status"
              options={[
                { label: "Alive", value: "Alive" },
                { label: "Dead", value: "Dead" },
                { label: "Unknown", value: "unknown" },
              ]}
              selectedOption={statusFilter}
              onFilterChange={setStatusFilter}
              onClearFilters={clearFilters} // Filtreleri temizle
            />

            {/* Filtre Bileşeni - Gender */}
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
              onClearFilters={clearFilters} // Filtreleri temizle
            />
          </Box>
        </Grid>

        {/* Sağ Tablo */}
        <Grid item xs={12} sm={8} md={9}>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Image
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Species
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Status
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Gender
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCharacters.map((character) => (
                  <TableRow key={character.id}>
                    <TableCell align="center">
                      <img
                        src={character.image}
                        alt={character.name}
                        width="50"
                        height="50"
                        style={{ borderRadius: "50%" }}
                      />
                    </TableCell>
                    <TableCell align="center">{character.name}</TableCell>
                    <TableCell align="center">{character.species}</TableCell>
                    <TableCell align="center">{character.status}</TableCell>
                    <TableCell align="center">{character.gender}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RickAndMortyTable;
