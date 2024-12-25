import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { styles } from "./CharacterTableStyle";

const CharacterTable = ({ characters, onRowClick, rowCount }) => {
  return (
    <TableContainer component={Paper} sx={styles.tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={styles.headerCell}>
              Image
            </TableCell>
            <TableCell align="center" sx={styles.headerCell}>
              Name
            </TableCell>
            <TableCell align="center" sx={styles.headerCell}>
              Species
            </TableCell>
            <TableCell align="center" sx={styles.headerCell}>
              Status
            </TableCell>
            <TableCell align="center" sx={styles.headerCell}>
              Gender
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {characters
            .slice(0, rowCount || characters.length)
            .map((character) => (
              <TableRow
                key={character.id}
                onClick={() => onRowClick(character)}
                sx={styles.tableRow}
              >
                <TableCell align="center">
                  <img
                    src={character.image}
                    alt={character.name}
                    style={styles.characterImage}
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
  );
};

export default CharacterTable;
