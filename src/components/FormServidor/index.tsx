import styles from "./FormServidor.module.scss";
import InputServidor from "../InputServidor";
import OpenExtraInputsButton from "../OpenExtraInputsButton";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useState } from "react";
import Title from "../Title";

function FormServidor() {
  const extraInputsOpen: boolean = useSelector((state: RootState): boolean => state.extraInputsOpen);
  const [extraInputsAmount,] = useState(1);

  return (
    <form className={styles["form-container"]}>
      <InputServidor label="Nome do servidor" value="Nome do servidor" onChange={() => ""} />
      <InputServidor label="Cargo ocupado" value="Cargo ocupado" onChange={() => ""} />
      <InputServidor label="Data de nascimento" value="Data de nascimento" onChange={() => ""} type="date" />
      <InputServidor label="Data de admissão" value="Data de admissão" onChange={() => ""} type="date" />
      <OpenExtraInputsButton onClick={() => ""}>Teste</OpenExtraInputsButton>
      {extraInputsOpen && (
        <div className={styles["extra-inputs-container"]}>
            {Array.from({ length: extraInputsAmount }, (_, index) => (
              <div key={index} className={styles["extra-input-group"]}>
                <Title type="h3">Órgão {index + 1}</Title>
                <div>
                  <InputServidor label="Órgão" value="Órgão" onChange={() => ""} />
                  <InputServidor label="Tempo de contribuição" value="Tempo de contribuição" onChange={() => ""} />
                </div>
              </div>
            ))}
        </div>
      )}
    </form>
  )
}

export default FormServidor;