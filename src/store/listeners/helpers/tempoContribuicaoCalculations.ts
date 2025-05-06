import { OrgaoAdicional } from "../../reducers/servidorDataSlice";

/**
 * Calcula o tempo de contribuição principal com base na data de admissão principal.
 * 
 * @param dataAdmissaoPrincipal - A data de admissão principal do servidor.
 * @returns Um objeto Date representando o tempo de contribuição principal.
 */
export function calculateTempoContribuicaoPrincipal(dataAdmissaoPrincipal: Date): Date {
  const currentDate: Date = new Date(new Date().setHours(0, 0, 0, 0));
  const tempoContribuicao: Date = new Date(currentDate.getTime() - dataAdmissaoPrincipal.getTime());
  return tempoContribuicao;
}

/**
 * Calcula o tempo de contribuição adicional somando os períodos de cada órgão adicional.
 * 
 * @param orgaosAdicionais - Uma lista de objetos representando os órgãos adicionais, 
 *                           contendo as datas de admissão e demissão.
 * @returns Um objeto Date representando o tempo total de contribuição adicional.
 */
export function calculateTempoContribuicaoAdicional(orgaosAdicionais: OrgaoAdicional[]): Date {
  const tempoContribuicaoAdicional: number = orgaosAdicionais.reduce((acc: number, orgaoAdicional: OrgaoAdicional) => {
    const dataAdmissao: Date = new Date(orgaoAdicional.data_admissao);
    const dataDemissao: Date = new Date(orgaoAdicional.data_demissao);
    return acc + (dataDemissao.getTime() - dataAdmissao.getTime());
  }, 0);
  return new Date(tempoContribuicaoAdicional);
}