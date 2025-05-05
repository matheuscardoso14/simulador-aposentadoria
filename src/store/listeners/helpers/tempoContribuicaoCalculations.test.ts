import { beforeEach, describe, expect, test } from "vitest";
import { calculateTempoContribuicaoAdicional, calculateTempoContribuicaoPrincipal } from "./tempoContribuicaoCalculations";
import { OrgaoAdicional } from "../../reducers/servidorDataSlice";

describe("calculateTempoContribuicaoPrinipal()", () => {
  let dataAdmissaoPrincipal: Date;
  let currentDate: Date;
  beforeEach(() => {
    dataAdmissaoPrincipal = new Date("2020-01-01");
    currentDate = new Date(new Date().setHours(0, 0, 0, 0));
  });

  test("deve retornar um objeto do tipo Date", () => {
    const result: Date = calculateTempoContribuicaoPrincipal(dataAdmissaoPrincipal);

    expect(result).toBeInstanceOf(Date);
  });

  test("deve retornar a diferença entre a data atual e a data da admissão mais recente", () => {
    const result: Date = calculateTempoContribuicaoPrincipal(dataAdmissaoPrincipal);
    const expectedResult: Date = new Date(currentDate.getTime() - dataAdmissaoPrincipal.getTime());

    expect(result.getTime()).toEqual(expectedResult.getTime());
  });
});

describe("calculateTempoContribuicaoAdicional()", () => {
  let orgaosAdicionais: OrgaoAdicional[];
  beforeEach(() => {
    orgaosAdicionais = [
      {
        id: "1",
        data_admissao: "2020-01-01",
        data_demissao: "2021-01-01",
      },
      {
        id: "2",
        data_admissao: "2021-02-01",
        data_demissao: "2022-02-01",
      }
    ];
  });

  test("deve retornar um objeto do tipo Date", () => {
    const result: Date = calculateTempoContribuicaoAdicional(orgaosAdicionais);

    expect(result).toBeInstanceOf(Date);
  });

  test("deve retornar a soma das diferenças entre as datas de admissão e demissão dos órgãos adicionais", () => {
    const result: Date = calculateTempoContribuicaoAdicional(orgaosAdicionais);
    const expectedResult: Date = new Date(
      new Date("2021-01-01").getTime() - new Date("2020-01-01").getTime() +
      new Date("2022-02-01").getTime() - new Date("2021-02-01").getTime()
    );

    expect(result.getTime()).toEqual(expectedResult.getTime());
  });
});