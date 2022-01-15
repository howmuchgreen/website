import { Co2EqUnit, Thing } from "@howmuchgreen/howmuchcarbon";
import { FC } from "react";
import * as S from "./styles";

interface Props {
  result: Thing;
}

const CARBON_YEARLY_TODAY_GRAMS = 4_800_000;
const CARBON_YEARLY_2050_GRAMS = 1_900_000;

export const ResultThing: FC<Props> = ({ result }) => {
  const [co2eq, unit] = result.co2Eq.format().split(" ");

  const percentageCarbonToday = Math.ceil(
    (result.co2Eq.averageInGrams * 100) / CARBON_YEARLY_TODAY_GRAMS
  );
  const percentageCarbon2050 = Math.ceil(
    (result.co2Eq.averageInGrams * 100) / CARBON_YEARLY_2050_GRAMS
  );

  return (
    <S.Container>
      <S.Header>
        <S.HeaderEmoji>🌱</S.HeaderEmoji>
        <S.HeaderTitle>how green is:</S.HeaderTitle>
        <S.HeaderThing $textLenght={Math.ceil(4 + 0.4 * result.name.length)}>
          {result.name}
        </S.HeaderThing>
      </S.Header>
      <S.Body>
        <S.Card>
          <S.CardTitle>CO2eq emitted</S.CardTitle>
          <S.CardNumberContainer>
            <S.CardNumberEmpty />
            <S.CardNumber>{co2eq}</S.CardNumber>
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
        Source:{" "}
        {result.sources.map((s) => (
          <span key={s}>
            <a href={s}>{new URL(s).host.replace("www.", "")}</a>
          </span>
        ))}
      </S.Body>
    </S.Container>
  );
};
