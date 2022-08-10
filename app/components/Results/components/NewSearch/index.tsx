import { useHotkeys } from "react-hotkeys-hook";
import { useNavigate } from "@remix-run/react";
import * as S from "./styles";

export const NewSearch = () => {
  const navigate = useNavigate();
  useHotkeys("enter", () => {
    navigate("/");
  });

  return (
    <S.Container>
      <S.Link to="/">New search</S.Link>
      <S.KeyboardHint>or press Enter</S.KeyboardHint>
    </S.Container>
  );
};
