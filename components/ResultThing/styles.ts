import styled from "styled-components";

// https://coolors.co/5c0029-f12711-f5af19-99b2dd-ffffff

export const Container = styled.div``;

export const Header = styled.div`
  /* background: linear-gradient(to left, #f12711, #f5af19); */
  padding-top: 32px;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 64px;
  /* color: white; */
  text-align: center;
`;

export const HeaderEmoji = styled.div`
  font-size: 4rem;
  line-height: 4rem;
`;

export const HeaderTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const HeaderThing = styled.div<{ $textLenght: number }>`
  font-weight: bold;
  font-size: calc(80vw / ${({ $textLenght }) => $textLenght});
  margin-top: 16px;
`;

export const Body = styled.div`
  margin-top: -64px;
  padding: 16px;
`;

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0px 2px 4px rgba(92, 0, 41, 0.25);
  margin-bottom: 8px;
`;

export const CardTitle = styled.div`
  text-align: center;
  color: #ff99c7;
  font-size: 0.9rem;
`;

export const CardNumberContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

export const CardNumberEmpty = styled.div`
  flex: 1;
`;

export const CardNumber = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 4rem;
  height: 4rem;
  color: #f12711;
`;

export const CardNumberUnit = styled.div`
  flex: 1;
  font-weight: bold;
  padding-left: 8px;
  font-size: 1rem;
  height: 1rem;
  color: #f12711;
`;

export const CardLine = styled.div`
  height: 1px;
  background: #ffebf4;
  width: 100%;
  margin-top: 32px;
`;

export const SubCardRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 16px;
`;

export const SubCardItem = styled.div`
  flex: 1;
  text-align: center;
`;

export const SubCardNumber = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
`;

export const SubCardLegend = styled.div`
  color: #ff99c7;
  font-size: 0.7rem;
`;
