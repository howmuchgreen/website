import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  bottom: 0px;
  right: 0px;
  padding: 8px;
  opacity: 0.5;
  transition: 0.3s opacity;

  :hover {
    opacity: 1;
  }

  a {
    color: inherit;

    :hover {
      text-decoration: underline;
    }
  }
`;
