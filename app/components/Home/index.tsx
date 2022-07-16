import React, { useState, useEffect, useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import * as Either from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { ResultObject, Thing, Trip } from "@howmuchgreen/howmuchcarbon/domain";
import { useNavigate } from "remix";

import * as S from "./styles";
import { getResultCo2Eq, getResultName, getResultPath } from "~/common/result";

type Result = Thing | Trip;

export const HomePage = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  useHotkeys(
    "down",
    (e) => {
      e.preventDefault();
      setSelectedIndex(Math.min(selectedIndex + 1, results.length - 1));
    },
    { enableOnTags: ["INPUT"] },
    [results]
  );
  useHotkeys(
    "up",
    (e) => {
      e.preventDefault();
      setSelectedIndex(Math.max(selectedIndex - 1, 0));
    },
    {
      enableOnTags: ["INPUT"],
    }
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!results[selectedIndex]) {
      return;
    }

    navigate(getResultPath(results[selectedIndex]));
  };

  useEffect(() => {
    if (query.length > 0) {
      fetch(`/api/${query}`)
        .then((res) => res.json())
        .then((res) => {
          setSelectedIndex(0);
          pipe(
            ResultObject.codec.decode(res),
            Either.map(({ results }) => results),
            Either.getOrElseW((e) => []),
            setResults
          );
        });
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div>
      <S.Container>
        <S.Title>🌱 how green is:</S.Title>
        <form onSubmit={onSubmit} method="post" action="/api/query">
          <S.Input
            placeholder="iPho…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputRef}
            name="query"
            spellCheck={false}
            autoComplete="off"
          />
        </form>
        <S.ResultsContainer>
          {results.map((result, i) => (
            <S.Result
              to={getResultPath(result)}
              key={i}
              $selected={i === selectedIndex}
            >
              <span>{getResultName(result)}</span>
              <span>{getResultCo2Eq(result).format()}</span>
            </S.Result>
          ))}
        </S.ResultsContainer>
      </S.Container>
    </div>
  );
};
