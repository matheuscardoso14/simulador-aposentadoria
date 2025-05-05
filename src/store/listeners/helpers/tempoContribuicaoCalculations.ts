import { OrgaoAdicional } from "../../reducers/servidorDataSlice";

export function calculateTempoContribuicaoPrincipal(dataAdmissaoPrincipal: Date): Date {
  const currentDate: Date = new Date(new Date().setHours(0, 0, 0, 0));
  const tempoContribuicao: Date = new Date(currentDate.getTime() - dataAdmissaoPrincipal.getTime());
  return tempoContribuicao;
}

export function calculateTempoContribuicaoAdicional(orgaosAdicionais: OrgaoAdicional[]): Date {
  const tempoContribuicaoAdicional: number = orgaosAdicionais.reduce((acc: number, orgaoAdicional: OrgaoAdicional) => {
    const dataAdmissao: Date = new Date(orgaoAdicional.data_admissao);
    const dataDemissao: Date = new Date(orgaoAdicional.data_demissao);
    return acc + (dataDemissao.getTime() - dataAdmissao.getTime());
  }, 0);
  return new Date(tempoContribuicaoAdicional);
}