import { useDispatch, useSelector } from "react-redux";
import styles from "./Result.module.scss";
import { RootState } from "../../store";
import { capitalizeFirstLetter } from "../../utils";
import Button from "../Button";
import { clearServidorData } from "../../store/reducers/servidorDataSlice";
import { clearRetirementDate } from "../../store/reducers/retirementDate";

function Result() {
  const dispatch = useDispatch();

  const nomeServidor: string = useSelector((state: RootState): string => state.servidorData.nome);
  const cargoServidor: string = useSelector((state: RootState): string => state.servidorData.cargo_ocupado);
  const dataAposentadoria: Date = useSelector((state: RootState): Date => new Date(state.retirementDate));

  function handleClick() {
    dispatch(clearServidorData());
    dispatch(clearRetirementDate());
    localStorage.clear();
  }

  return (
    <div className={styles["result-container"]}>
      <p className={styles.text}>Senhor(a) {capitalizeFirstLetter(nomeServidor)}, {capitalizeFirstLetter(cargoServidor)}, você se aposentará no dia:</p>
      <div className={styles.result}>
        <p className={styles["result__date"]}>{dataAposentadoria.toLocaleDateString("pt-BR", { day: "2-digit", month:"2-digit", year:"numeric" })}</p>
        <p className={styles["result__text"]}>{dataAposentadoria.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
      </div>
      <Button onClick={handleClick}>Novo cálculo</Button>
    </div>
  );
}

export default Result;