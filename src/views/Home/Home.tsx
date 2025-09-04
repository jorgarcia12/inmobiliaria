import { CardsSection } from "../../components/UI/CardsSection/CardsSection";
import { MainBanner } from "../../components/UI/MainBanner/MainBanner";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <MainBanner />
      <CardsSection />
    </div>
  );
};
