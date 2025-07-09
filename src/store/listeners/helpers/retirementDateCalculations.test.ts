import { beforeEach, describe, expect, test } from "vitest";
import { RootState } from "../..";
import { calculateDataAposentadoria, getIdadeMinima, getPrimeiraAdmissao, getTempoContribuicaoMinimo } from "./retirementDateCalculations";
import Genero from "../../../enums/Genero";

describe("getPrimeiraAdmissao()", () => {
  let state: RootState;
  beforeEach(() => {
    state = {
      servidorData: {
        data_admissao: "2020-01-01",
        orgaos_adicionais: [
          { id: "1", data_admissao: "2019-01-01", data_demissao: "" },
          { id: "2", data_admissao: "2021-01-01", data_demissao: "" },
        ],
      } as unknown as RootState,
    } as RootState;
  });

  test("deve retornar um objeto do tipo Date", () => {
    const result: Date = getPrimeiraAdmissao(state);
    
    expect(result).toBeInstanceOf(Date);
  });

  test("deve retornar a data de admissão mais antiga quando há múltiplos órgãos adicionais", () => {
    const result: Date = getPrimeiraAdmissao(state);
    const expectedResult: Date = new Date("2019-01-01");

    expect(result).toEqual(expectedResult);
  });

  test("caso exista apenas um órgão adicional com data de admissão, essa informação deve ser retornada", () => {
    state = {
      servidorData: {
        data_admissao: "2020-01-01",
        orgaos_adicionais: [
          { id: "1", data_admissao: "2019-01-01", data_demissao: "" }
        ],
      } as unknown as RootState,
    } as RootState;

    const result: Date = getPrimeiraAdmissao(state);
    const expectedResult: Date = new Date("2019-01-01");

    expect(result).toEqual(expectedResult);
  });

  test("deve retornar a data de admissão principal caso não existam órgãos adicionais com data de admissão", () => {
    state = {
      servidorData: {
        data_admissao: "2020-01-01",
        orgaos_adicionais: [
          { id: "1", data_admissao: "", data_demissao: "" }
        ],
      } as unknown as RootState,
    } as RootState;

    const result: Date = getPrimeiraAdmissao(state);
    const expectedResult: Date = new Date("2020-01-01");

    expect(result).toEqual(expectedResult);
  });
});

describe("getIdadeMinima()", () => {
  let dataNascimento: Date;
  beforeEach(() => {
    dataNascimento = new Date("1990-01-01");
  });

  test("deve retornar um objeto do tipo Date", () => {
    const result: Date = getIdadeMinima(dataNascimento, Genero.Masculino);

    expect(result).toBeInstanceOf(Date);
  });

  describe("caso o gênero seja masculino", () => {
    test("deve retornar um Date com 60 anos a mais que a data de nascimento", () => {
      const result: string = getIdadeMinima(dataNascimento, Genero.Masculino).toISOString().split("T")[0];
      const expectedResult: string = new Date("2050-01-01").toISOString().split("T")[0];

      expect(result).toEqual(expectedResult);
    });
  });

  describe("caso o gênero seja feminino", () => {
    test("deve retornar um Date com 55 anos a mais que a data de nascimento", () => {
      const result: string = getIdadeMinima(dataNascimento, Genero.Feminino).toISOString().split("T")[0];
      const expectedResult: string = new Date("2045-01-01").toISOString().split("T")[0];

      expect(result).toEqual(expectedResult);
    });
  });
});

describe("getTempoContribuicaoMinimo()", () => {
  let primeiraAdmissao: Date;
  beforeEach(() => {
    primeiraAdmissao = new Date("2020-01-01");
  });

  test("deve retornar um objeto do tipo Date", () => {
    const result: Date = getTempoContribuicaoMinimo(primeiraAdmissao, Genero.Masculino);

    expect(result).toBeInstanceOf(Date);
  });

  describe("caso o gênero seja masculino", () => {
    test("deve retornar um Date com 35 anos a mais que a data da primeira admissão", () => {
      const result: Date = getTempoContribuicaoMinimo(primeiraAdmissao, Genero.Masculino);
      const expectedResult: Date = new Date("2055-01-01");

      expect(result).toEqual(expectedResult);
    });
  });

  describe("caso o gênero seja feminino", () => {
    test("deve retornar um Date com 30 anos a mais que a data da primeira admissão", () => {
      const result: Date = getTempoContribuicaoMinimo(primeiraAdmissao, Genero.Feminino);
      const expectedResult: Date = new Date("2050-01-01");

      expect(result).toEqual(expectedResult);
    });
  });
});

describe("calculateDataAposentadoria()", () => {
  let idadeMinima: Date;
  let tempoContribuicaoMinimo: Date;
  beforeEach(() => {
    idadeMinima = new Date("2050-01-01");
    tempoContribuicaoMinimo = new Date("2035-01-01");
  });

  test("deve retornar um objeto do tipo Date", () => {
    const result: Date = calculateDataAposentadoria(idadeMinima, tempoContribuicaoMinimo);

    expect(result).toBeInstanceOf(Date);
  });

  test("deve retornar o maior Date", () => {
    const result: Date = calculateDataAposentadoria(idadeMinima, tempoContribuicaoMinimo);

    expect(result).toEqual(idadeMinima);
  });
});