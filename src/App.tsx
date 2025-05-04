import { useSelector } from "react-redux";
import styles from "./App.module.scss";
import FormServidor from "./components/FormServidor";
import Title from "./components/Title";
import { RootState } from "./store";
import Result from "./components/Result";

function App() {
  const dataAposentadoria: string = useSelector((state: RootState) => state.retirementDate);

  return (
    <div className={styles.App}>
      <header>
        <Title type="h1">Simulador de aposentadoria</Title>
      </header>
      <section>
        {!dataAposentadoria
          ? <FormServidor />
          : <Result />
        }
      </section>
    </div>
  );
}

export default App;
