import { Trip } from "@howmuchgreen/howmuchcarbon";
import { FC } from "react";
import {
  getCarbon2050Percentage,
  getCarbonTodayPercentage,
} from "../../../common/carbon";
import * as S from "./styles";
import { flag } from "country-emoji";
import { NewSearch } from "../components/NewSearch";
import { CO2eq } from "~/components/CO2eq";

interface Props {
  result: Trip;
}

export const ResultTrip: FC<Props> = ({ result }) => {
  const [transportFlight] = result.transports;
  const co2Eq = transportFlight.co2Eq;
  const [co2, unit] = co2Eq.format().split(" ");

  const percentageCarbonToday = getCarbonTodayPercentage(co2Eq);
  const percentageCarbon2050 = getCarbon2050Percentage(co2Eq);

  const name = `${flag(result.origin.country)} ${result.origin.name} ✈ ${
    result.destination.name
  } ${flag(result.destination.country)}`;

  return (
    <S.Container>
      <S.Header>
        <S.HeaderEmoji>🌱</S.HeaderEmoji>
        <S.HeaderTitle>how green is:</S.HeaderTitle>
        <S.HeaderThing $textLenght={Math.ceil(4 + 0.4 * name.length)}>
          {name}
        </S.HeaderThing>
      </S.Header>
      <S.Body>
        <S.Card>
          <S.CardTitle>
            <CO2eq /> emitted
          </S.CardTitle>
          <S.CardNumberContainer>
            <S.CardNumberEmpty />
            <S.CardNumber>{co2}</S.CardNumber>
            <S.CardNumberUnit>{unit}</S.CardNumberUnit>
          </S.CardNumberContainer>
          <S.CardLine />
          <S.SubCardRow>
            <S.SubCardItem>
              <S.SubCardNumber>{percentageCarbonToday}%</S.SubCardNumber>
              <S.SubCardLegend>an average person emissions</S.SubCardLegend>
            </S.SubCardItem>
            <S.SubCardItem>
              <S.SubCardNumber>{percentageCarbon2050}%</S.SubCardNumber>
              <S.SubCardLegend>2050 emissions target</S.SubCardLegend>
            </S.SubCardItem>
          </S.SubCardRow>
        </S.Card>
        <div>
          Explanation:{" "}
          {new Intl.NumberFormat(undefined, {
            maximumFractionDigits: 0,
          }).format(result.distanceInKm)}{" "}
          km × {transportFlight.explanation.co2EqPerKm.format()}/km
          <br />
          Cf.{" "}
          {transportFlight.explanation.sources.map((s) => (
            <span key={s}>
              <a href={s} target="_blank" rel="noreferrer">
                {new URL(s).host.replace("www.", "")}
              </a>
            </span>
          ))}
        </div>
        <NewSearch />
      </S.Body>
    </S.Container>
  );
};
