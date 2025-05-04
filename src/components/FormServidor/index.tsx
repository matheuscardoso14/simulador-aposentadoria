import styles from "./FormServidor.module.scss";
import InputServidor from "../InputServidor";
import OpenExtraInputsButton from "./OpenExtraInputsButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import AddExtraInputGroupButton from "./AddExtraInputGroupButton";
import RemoveExtraInputGroupButton from "./RemoveExtraInputGroupButton";
import SelectServidor from "../SelectServidor";
import { clearServidorData, OrgaoAdicional, setOrgaoAdicional, setProperty } from "../../store/reducers/servidorDataSlice";
import Button from "../Button";
import { calculateTempoContribuicao } from "../../store/listeners/makeTempoContribuicaoCalculation";
import { FormEvent } from "react";
import { makeRetirementDateCalculation } from "../../store/listeners/makeRetirementDateCalculation";

const generos: Array<{ value: string, label: string }> = [
  { value: "masculino", label: "Masculino" },
  { value: "feminino", label: "Feminino" },
];

function FormServidor() {
  const dispatch = useDispatch();
  
  const nomeServidor: string = useSelector((state: RootState): string => state.servidorData.nome);
  const dataNascimento: string = useSelector((state: RootState): string => state.servidorData.data_nascimento);
  const genero: string = useSelector((state: RootState): string => state.servidorData.genero);
  const cargoOcupado: string = useSelector((state: RootState): string => state.servidorData.cargo_ocupado);
  const dataAdmissao: string = useSelector((state: RootState): string => state.servidorData.data_admissao);
  const orgaosAdicionais: OrgaoAdicional[] = useSelector((state: RootState): OrgaoAdicional[] => state.servidorData.orgaos_adicionais);
  const tempoContribuicao: number | null = useSelector((state: RootState): number | null => state.servidorData.tempo_contribuicao);
  
  const extraInputsOpen: boolean = useSelector((state: RootState): boolean => state.extraInputsOpen);
  const disabled: boolean = (nomeServidor === "" || dataNascimento === "" || genero === "" || cargoOcupado === "" || dataAdmissao === "");

  
  function handlePropertyChange(property: string) {
    return (value: string) => {
      dispatch(setProperty({ property, value }));
    };
  }
  
  function handleOrgaoAdicionalChange(index: number, property: "data_admissao" | "data_demissao") {
    return (value: string) => {
      dispatch(setOrgaoAdicional({ index, property, value }));
    };
  }
  
  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(calculateTempoContribuicao({
      data_admissao_principal: dataAdmissao,
      orgaos_adicionais: orgaosAdicionais,
    }));

    if (tempoContribuicao !== null) {
      dispatch(makeRetirementDateCalculation({
        data_nascimento: dataNascimento,
        data_admissao: dataAdmissao,
        genero 
      }));
      dispatch(clearServidorData());
    }
  }

  return (
    <div className={styles["form-container"]}>
      <p className={styles.text}>Olá, servidor! Preencha os campos abaixo para calcularmos sua data de aposentadoria.</p>
      <form onSubmit={handleFormSubmit}>
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
                  <InputServidor label="Data de admissão" value={orgaosAdicionais[index].data_admissao} type="date" onChange={handleOrgaoAdicionalChange(index, "data_admissao")} />
                  <InputServidor label="Data de demissão" value={orgaosAdicionais[index].data_demissao} type="date" onChange={handleOrgaoAdicionalChange(index, "data_demissao")} />
                  {index > 0 && <RemoveExtraInputGroupButton inputId={id}>Remover</RemoveExtraInputGroupButton>}
                </div>
              ))}
              <AddExtraInputGroupButton>Adicionar órgão</AddExtraInputGroupButton>
          </div>
        )}
        <Button type="submit" disabled={disabled}>Realizar cálculo</Button>
      </form>
    </div>
  );
}

export default FormServidor;