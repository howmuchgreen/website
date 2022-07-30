import styled from "styled-components";
import { Link as RemixLink } from "remix";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 64px;
`;

export const Link = styled(RemixLink)`
  font-weight: bold;
  border: 2px solid black;
  padding: 4px 8px;
  border-radius: 8px;
  color: black;
  display: block;
  cursor: pointer;

  transition: background-color 0.2s;

  :hover {
    text-decoration: none;
    background-color: white;
  }
`;

export const KeyboardHint = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
  margin-top: 4px;
`;
