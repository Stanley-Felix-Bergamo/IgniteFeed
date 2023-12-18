import styles from "./Header.module.css";
import ingniteLogo from "../assets/ignite-logo.svg";

export const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <div>
          <img src={ingniteLogo} alt="Logotipo do Ignite" />
        </div>
        <div className={styles.titulo}>
          <h2>Ignite Feed</h2>
        </div>
      </header>
    </>
  );
};
