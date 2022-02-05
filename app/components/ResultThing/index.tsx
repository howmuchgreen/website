import { Thing } from "@howmuchgreen/howmuchcarbon";
import { FC } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useNavigate } from "remix";
import {
  getCarbon2050Percentage,
  getCarbonTodayPercentage,
} from "../../common/carbon";
import * as S from "./styles";

interface Props {
  result: Thing;
}

export const ResultThing: FC<Props> = ({ result }) => {
  const navigate = useNavigate();
  useHotkeys("enter", () => {
    navigate("/");
  });

  const [co2eq, unit] = result.co2Eq.format().split(" ");

  const percentageCarbonToday = getCarbonTodayPercentage(result.co2Eq);
  const percentageCarbon2050 = getCarbon2050Percentage(result.co2Eq);

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
        <div>
          Source:{" "}
          {result.sources.map((s) => (
            <span key={s}>
              <a href={s} target="_blank" rel="noreferrer">
                {new URL(s).host.replace("www.", "")}
              </a>
            </span>
          ))}
        </div>
        <S.NewSearchContainer>
          <S.NewSearch to="/">New search</S.NewSearch>
          <S.NewSearchKeyboard>or press Enter</S.NewSearchKeyboard>
        </S.NewSearchContainer>
      </S.Body>
    </S.Container>
  );
};
