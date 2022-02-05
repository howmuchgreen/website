import styled from "styled-components";
import { Link } from "remix";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-top: 20vh;
  padding: 16px;
`;

export const Title = styled.div`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 32px;
  padding-right: 2ch; // to center the text and ignore the emoji

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Input = styled.input`
  background: white;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  font-size: 2rem;
  font-family: "Nunito", sans-serif;
  padding: 4px 16px;
  width: 100%;
  border: none;
  outline: none;

  ::placeholder {
    color: #aaa;
  }
`;

export const ResultsContainer = styled.div`
  margin: 8px 16px;
`;

export const Result = styled(Link)<{ $selected: boolean }>`
  color: #999;
  transition: color 0.2s;
  font-size: 2rem;
  display: flex;
  cursor: pointer;
  flex-direction: row;
  justify-content: space-between;

  ${({ $selected }) => ($selected ? "color: black;" : "")}

  :hover {
    color: black;
    text-decoration: none;
  }
`;
