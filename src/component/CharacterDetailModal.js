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

const CharacterDetailModal = ({ open, onClose, character }) => {
  if (!character) return null; // Karakter bilgisi yoksa modal gösterme

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{character.name}</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <img
            src={character.image}
            alt={character.name}
            width="150"
            height="150"
            style={{ borderRadius: "50%" }}
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
