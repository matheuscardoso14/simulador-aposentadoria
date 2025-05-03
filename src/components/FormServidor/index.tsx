import styles from "./FormServidor.module.scss";
import InputServidor from "../InputServidor";
import OpenExtraInputsButton from "./OpenExtraInputsButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import AddExtraInputGroupButton from "./AddExtraInputGroupButton";
import RemoveExtraInputGroupButton from "./RemoveExtraInputGroupButton";
import SelectServidor from "../SelectServidor";
import { OrgaosAdicionais, setOrgaoAdicional, setProperty } from "../../store/reducers/servidorDataSlice";
import Button from "../Button";

const generos: Array<{ value: string, label: string }> = [
  { value: "masculino", label: "Masculino" },
  { value: "feminino", label: "Feminino" },
]

function FormServidor() {
  const dispatch = useDispatch();
  
  function handlePropertyChange(property: string) {
    return (value: string) => {
      dispatch(setProperty({ property, value }));
    }
  }

  function handleOrgaoAdicionalChange(index: number, property: "nome" | "tempo_contribuicao") {
    return (value: string) => {
      dispatch(setOrgaoAdicional({ index, property, value }));
    }
  }

  const nomeServidor: string = useSelector((state: RootState): string => state.servidorData.nome)
  const dataNascimento: string = useSelector((state: RootState): string => state.servidorData.data_nascimento);
  const genero: string = useSelector((state: RootState): string => state.servidorData.genero);
  const cargoOcupado: string = useSelector((state: RootState): string => state.servidorData.cargo_ocupado);
  const dataAdmissao: string = useSelector((state: RootState): string => state.servidorData.data_admissao);
  const orgaosAdicionais: OrgaosAdicionais[] = useSelector((state: RootState): OrgaosAdicionais[] => state.servidorData.orgaos_adicionais);

  const extraInputsOpen: boolean = useSelector((state: RootState): boolean => state.extraInputsOpen);
  const disabled: boolean = (nomeServidor === "" || dataNascimento === "" || genero === "" || cargoOcupado === "" || dataAdmissao === "");

  return (
    <div className={styles["form-container"]}>
      <p className={styles.text}>Olá, servidor! Preencha os campos abaixo para calcularmos sua data de aposentadoria.</p>
      <form>
        <InputServidor label="Nome do servidor" value={nomeServidor} onChange={handlePropertyChange("nome")} />
        <InputServidor label="Data de nascimento" value={dataNascimento} type="date" onChange={handlePropertyChange("data_nascimento")} />
        <SelectServidor label="Gênero" options={generos} value={genero} placeholder="Selecione seu gênero" onChange={handlePropertyChange("genero")} />
        <InputServidor label="Cargo ocupado" value={cargoOcupado} onChange={handlePropertyChange("cargo_ocupado")} />
        <InputServidor label="Data de admissão" value={dataAdmissao} type="date" onChange={handlePropertyChange("data_admissao")} />
        <OpenExtraInputsButton>Outros órgãos</OpenExtraInputsButton>
        {extraInputsOpen && (
          <div className={styles["extra-inputs__container"]}>
              {orgaosAdicionais.map(({ id }: { id: string }, index) => (
                <div key={id} className={styles["extra-input-group"]}>
                  <InputServidor label={`Órgao ${index + 1}`} value={orgaosAdicionais[index].nome} onChange={handleOrgaoAdicionalChange(index, "nome")} />
                  <InputServidor label="Tempo de contribuição" value={orgaosAdicionais[index].tempo_contribuicao} onChange={handleOrgaoAdicionalChange(index, "tempo_contribuicao")} />
                  {index > 0 && <RemoveExtraInputGroupButton inputId={id}>Remover</RemoveExtraInputGroupButton>}
                </div>
              ))}
              <AddExtraInputGroupButton>Adicionar órgão</AddExtraInputGroupButton>
          </div>
        )}
        <Button type="submit" disabled={disabled}>Realizar cálculo</Button>
      </form>
    </div>
  )
}

export default FormServidor;