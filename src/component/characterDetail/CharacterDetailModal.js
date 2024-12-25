import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { styles } from "./CharacterDetailModalStyle";

const CharacterDetailModal = ({ open, onClose, character }) => {
  if (!character) return null; // Karakter bilgisi yoksa modal gösterme

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{character.name}</DialogTitle>
      <DialogContent>
        <Box sx={styles.container}>
          <img
            src={character.image}
            alt={character.name}
            style={styles.image}
          />
          <Typography variant="body1">
            <strong>Species:</strong> {character.species}
          </Typography>
          <Typography variant="body1">
            <strong>Status:</strong> {character.status}
          </Typography>
          <Typography variant="body1">
            <strong>Gender:</strong> {character.gender}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CharacterDetailModal;
