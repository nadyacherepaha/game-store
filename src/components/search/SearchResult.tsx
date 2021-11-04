import React, { FC, Fragment } from "react";
import debounce from "lodash.debounce";
import { BASE_URL } from "../../utils";
import SearchInput from "./SearchInput";
import CardGame from "../games/card-game/CardGame";
import style from "../games/card-game/cardGame.module.scss";

const fetchSearchResults = async (query: string) => {
  if (query && query.length > 0) {
    const url = `${BASE_URL}/games?search=${query.trim()}`;
    const res = await fetch(url);
    const resJson = res.json();
    return resJson;
  }
  return [];
};
const fetchData = async (query: string, cb) => {
  const res = await fetchSearchResults(query);
  cb(res);
};

const debouncedFetchData = debounce((query: string, cb) => {
  if (query?.length >= 3) {
    fetchData(query, cb);
  }
}, 300);

const SearchResult: FC = () => {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);

  return (
    <>
      <SearchInput
        value={query}
        onChangeText={(e) => {
          setQuery(e.target.value);
          debouncedFetchData(e.target.value, (res) => {
            setResults(res);
          });
        }}
      />
      <div className={style.cards}>
        {results.map((result, index) => (
          <div key={index}>
            <Fragment key={index}>
              <CardGame {...result} />
            </Fragment>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchResult;