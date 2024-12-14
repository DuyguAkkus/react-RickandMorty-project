import React, { useState, useEffect } from "react";
import RickAndMortyTable from "./component/RickAndMortyTable";
import Header from "./component/Header";
import LoadingComponent from "./component/ LoadingComponent";

const App = () => {
  const [isLoading, setIsLoading] = useState(false); // Genel yükleme durumu
  const [errorMessage, setErrorMessage] = useState(""); // Genel hata durumu

  useEffect(() => {
    // Yükleme durumu simülasyonu
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <>
      <Header />
      {isLoading || errorMessage ? (
        <LoadingComponent
          isLoading={isLoading}
          errorMessage={setErrorMessage}
        />
      ) : (
        <RickAndMortyTable />
      )}
    </>
  );
};

export default App;
