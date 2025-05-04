import { listener as makeTempoContribuicaoCalculation } from "./makeTempoContribuicaoCalculation";
import { listener as makeRetirementDateCalculation } from "./makeRetirementDateCalculation";

const listeners = [makeTempoContribuicaoCalculation, makeRetirementDateCalculation];

export default listeners;