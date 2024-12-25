export const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center", 
    gap: 1,
    marginTop: 3,
    flexWrap: "wrap",
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
    padding: 2
  },
  button: {
    '&.active': {
      backgroundColor: '#1976d2',
      color: '#fff'
    }
  }
};
