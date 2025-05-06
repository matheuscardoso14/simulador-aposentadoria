import { RootState } from "../..";
import Genero from "../../../enums/Genero";
import { OrgaoAdicional } from "../../reducers/servidorDataSlice";

/**
 * Obtém a data da primeira admissão do servidor considerando os órgãos adicionais.
 * @param state - Estado global da aplicação.
 * @returns A data da primeira admissão.
 */
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

/**
 * Calcula a idade mínima para aposentadoria com base na data de nascimento e gênero.
 * @param dataNascimento - Data de nascimento do servidor.
 * @param genero - Gênero do servidor ("masculino" ou "feminino").
 * @returns A data em que o servidor atinge a idade mínima.
 */
export function getIdadeMinima(dataNascimento: Date, genero: Genero): Date {
  const idadeMinima: Date = dataNascimento;

  if (genero === Genero.Masculino) {
    idadeMinima.setFullYear(idadeMinima.getFullYear() + 60);
  }
  else if (genero === Genero.Feminino) {
    idadeMinima.setFullYear(idadeMinima.getFullYear() + 55);
  }
  return idadeMinima;
}

/**
 * Calcula o tempo mínimo de contribuição necessário para aposentadoria.
 * @param primeiraAdmissao - Data da primeira admissão do servidor.
 * @param genero - Gênero do servidor ("masculino" ou "feminino").
 * @returns A data em que o servidor atinge o tempo mínimo de contribuição.
 */
export function getTempoContribuicaoMinimo(primeiraAdmissao: Date, genero: Genero): Date {
  const tempoContribuicaoMinimo: Date = primeiraAdmissao;
  if (genero === Genero.Masculino) {
    tempoContribuicaoMinimo.setFullYear(tempoContribuicaoMinimo.getFullYear() + 35);
  }
  else if (genero === Genero.Feminino) {
    tempoContribuicaoMinimo.setFullYear(tempoContribuicaoMinimo.getFullYear() + 30);
  }
  return tempoContribuicaoMinimo;
}

/**
 * Calcula a data de aposentadoria com base na idade mínima e no tempo de contribuição mínimo.
 * @param idadeMinima - Data em que o servidor atinge a idade mínima.
 * @param tempoContribuicaoMinimo - Data em que o servidor atinge o tempo mínimo de contribuição.
 * @returns A data de aposentadoria.
 */
export function calculateDataAposentadoria(idadeMinima: Date, tempoContribuicaoMinimo: Date): Date {
  return new Date(Math.max(idadeMinima.getTime(), tempoContribuicaoMinimo.getTime()));
}