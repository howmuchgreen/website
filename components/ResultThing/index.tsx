import { FC } from "react";
import { Thing } from "../../common/types";
import * as S from "./styles";

interface Props {
  result: Thing;
}

export const ResultThing: FC<Props> = ({ result }) => (
  <S.Container>
    <S.Header>
      <S.HeaderEmoji>🌱</S.HeaderEmoji>
      <S.HeaderTitle>How much green is:</S.HeaderTitle>
      <S.HeaderThing $textLenght={Math.ceil(4 + 0.4 * result.name.length)}>
        {result.name}
      </S.HeaderThing>
    </S.Header>
    <S.Body>
      <S.Card>
        <S.CardTitle>CO2eq emitted</S.CardTitle>
        <S.CardNumberContainer>
          <S.CardNumberEmpty />
          <S.CardNumber>{result.co2eq.kg}</S.CardNumber>
          <S.CardNumberUnit>kg</S.CardNumberUnit>
        </S.CardNumberContainer>
        <S.CardLine />
        <S.SubCardRow>
          <S.SubCardItem>
            <S.SubCardNumber>7%</S.SubCardNumber>
            <S.SubCardLegend>your yearly emissions</S.SubCardLegend>
          </S.SubCardItem>
          <S.SubCardItem>
            <S.SubCardNumber>26%</S.SubCardNumber>
            <S.SubCardLegend>2050 emissions target</S.SubCardLegend>
          </S.SubCardItem>
        </S.SubCardRow>
      </S.Card>
      Source:{" "}
      {result.sources.map((s) => (
        <span key={s}>
          <a href={s}>{s}</a>
        </span>
      ))}
    </S.Body>
  </S.Container>
);
