import { RootState } from "../..";
import { OrgaoAdicional } from "../../reducers/servidorDataSlice";

export function getPrimeiraAdmissao(state: RootState): Date {
  const orgaosAdicionais: OrgaoAdicional[] = state.servidorData.orgaos_adicionais;

  if (orgaosAdicionais.length > 1) {
    return new Date([...orgaosAdicionais]
      .sort((a, b) => new Date(a.data_admissao).getTime() - new Date(b.data_admissao).getTime())[0].data_admissao);
  }
  else if (orgaosAdicionais.length === 1 && orgaosAdicionais[0].data_admissao) {
    return new Date([...orgaosAdicionais][0].data_admissao);
  }
  else {
    return new Date(state.servidorData.data_admissao);
  }
}

export function getIdadeMinima(dataNascimento: Date, genero: string): Date {
  const idadeMinima: Date = dataNascimento;

  if (genero === "masculino") {
    idadeMinima.setFullYear(idadeMinima.getFullYear() + 60);
  }
  else if (genero === "feminino") {
    idadeMinima.setFullYear(idadeMinima.getFullYear() + 55);
  }
  return idadeMinima;
}

export function getTempoContribuicaoMinimo(primeiraAdmissao: Date, genero: string): Date {
  const tempoContribuicaoMinimo: Date = primeiraAdmissao;
  if (genero === "masculino") {
    tempoContribuicaoMinimo.setFullYear(tempoContribuicaoMinimo.getFullYear() + 35);
  }
  else if (genero === "feminino") {
    tempoContribuicaoMinimo.setFullYear(tempoContribuicaoMinimo.getFullYear() + 30);
  }
  return tempoContribuicaoMinimo;
}

export function calculateDataAposentadoria(idadeMinima: Date, tempoContribuicaoMinimo: Date): Date {
  return new Date(Math.max(idadeMinima.getTime(), tempoContribuicaoMinimo.getTime()));
}