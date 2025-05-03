import Title from "../Title";
import styles from "./Header.module.scss";

function Header() {
  return (
    <header>
      <Title type="h1">Simulador de aposentadoria</Title>
      <p className={styles.text}>Olá, servidor! Informe seus dados abaixo e descubra sua data de aposentadoria.</p>
    </header>
  )
}

export default Header;