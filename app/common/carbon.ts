// Sources: https://www.carbonbrief.org/analysis-why-children-must-emit-eight-times-less-co2-than-their-grandparents

import { Co2Eq } from "@howmuchgreen/howmuchcarbon";

// Sources: https://www.lemonde.fr/planete/article/2019/04/11/combien-de-co2-pourrez-vous-emettre-dans-votre-vie-si-le-rechauffement-est-contenu-a-1-5-degre_5448606_3244.html
const CARBON_YEARLY_TODAY_GRAMS = 4_800_000;
const CARBON_YEARLY_2050_GRAMS = 1_900_000;

export const getCarbonTodayPercentage = (co2Eq: Co2Eq) => {
  const percentageCarbonToday = Math.ceil(
    (co2Eq.averageInGrams * 100) / CARBON_YEARLY_TODAY_GRAMS
  );

  return percentageCarbonToday;
};

export const getCarbon2050Percentage = (co2Eq: Co2Eq) => {
  const percentageCarbon2050 = Math.ceil(
    (co2Eq.averageInGrams * 100) / CARBON_YEARLY_2050_GRAMS
  );

  return percentageCarbon2050;
};
