import styles from "./FormServidor.module.scss";
import InputServidor from "../InputServidor";
import OpenExtraInputsButton from "./OpenExtraInputsButton";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import AddExtraInputButton from "./AddExtraInputButton";
import RemoveExtraInputButton from "./RemoveExtraInputButton";
import SelectServidor from "../SelectServidor";

function FormServidor() {
  const extraInputsOpen: boolean = useSelector((state: RootState): boolean => state.extraInputsOpen);
  const extraInputs: string[] = useSelector((state: RootState): string[] => state.extraInputs);

  const generos = [
    { value: "masculino", label: "Masculino" },
    { value: "feminino", label: "Feminino" },
  ]

  return (
    <div className={styles["form-container"]}>
      <p className={styles.text}>Olá, servidor! Preencha os campos abaixo para calcularmos sua data de aposentadoria.</p>
      <form>
        <InputServidor label="Nome do servidor" value="Nome do servidor" onChange={() => ""} />
        <InputServidor label="Data de nascimento" value="Data de nascimento" onChange={() => ""} type="date" />
        <SelectServidor label="Gênero" value="Selecione seu gênero" options={generos} placeholder="Selecione seu gênero" />
        <InputServidor label="Cargo ocupado" value="Cargo ocupado" onChange={() => ""} />
        <InputServidor label="Data de admissão" value="Data de admissão" onChange={() => ""} type="date" />
        <OpenExtraInputsButton>Outros órgãos</OpenExtraInputsButton>
        {extraInputsOpen && (
          <div className={styles["extra-inputs__container"]}>
              {extraInputs.map((id: string, index: number) => (
                <div key={id} className={styles["extra-input-group"]}>
                  <InputServidor label={`Órgão ${index + 1}`} value="Órgão" onChange={() => ""} />
                  <InputServidor label="Tempo de contribuição" value="Tempo de contribuição" onChange={() => ""} />
                  {index > 0 && <RemoveExtraInputButton>Remover</RemoveExtraInputButton>}
                </div>
              ))}
              <AddExtraInputButton>Adicionar órgão</AddExtraInputButton>
          </div>
        )}
      </form>
    </div>
  )
}

export default FormServidor;