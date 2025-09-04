import styles from "./MainBanner.module.css";
import bannerfondo from "../../../assets/bannerImg.jpg";
import { Button } from "react-bootstrap";
import React, { useState } from "react";
import { Search } from "lucide-react";
export const MainBanner = () => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Buscando:", query);
  };
  return (
    <div
      style={{
        backgroundImage: `url(${bannerfondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "560px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={styles.bannerSearchContainer}>
        <h1 className={styles.bannerTitle}>Inverti con vision</h1>
        <div className={styles.preFilterContainer}>
          <Button className={styles.bannerMainButton}>Quiero Comprar</Button>
          <Button className={styles.bannerButton}>Quiero Alquilar</Button>
          <Button className={styles.bannerButton}>
            Quiero Vender
          </Button>
        </div>
        <div className={styles.searchBarContainer}>
          <form onSubmit={handleSubmit} className={styles.searchBar}>
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Buscar..."
              className={styles.inputSearch}
            />
            <Button className={styles.searchButton} type="submit">
              <Search size={"20px"} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
