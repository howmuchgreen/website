import { Thing, Trip } from "@howmuchgreen/howmuchcarbon/domain";

type Result = Thing | Trip;

export const getResultPath = (result: Result) => {
  if (result.kind === "thing") {
    return `/${result.name.replace(/ /g, "")}`;
  } else {
    return `/${result.origin.name} ${result.destination.name}`;
  }
};

export const getResultName = (result: Result) => {
  if (result.kind === "thing") {
    return result.name;
  } else {
    return `${result.origin.name} ✈️ ${result.destination.name}`;
  }
};

export const getResultCo2Eq = (result: Result) => {
  if (result.kind === "thing") {
    return result.co2Eq;
  } else {
    return result.transports[0].co2Eq;
  }
};
