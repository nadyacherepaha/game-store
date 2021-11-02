import React, { FC, Fragment } from "react";
import debounce from "lodash.debounce";
import { fetchSearchResults } from "../../utils";
import SearchInput from "./SearchInput";
import CardGame from "../games/card-game/CardGame";
import style from "../games/card-game/cardGame.module.scss";

const fetchData = async (query, cb) => {
  const res = await fetchSearchResults(query);
  cb(res);
};

const debouncedFetchData = debounce((query, cb) => {
  fetchData(query, cb);
}, 300);

const SearchResult: FC = () => {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    debouncedFetchData(query, (res) => {
      setResults(res);
    });
  }, [query]);

  return (
    <>
      <SearchInput
        value={query}
        onChangeText={(e) => {
          setQuery(e.target.value);
        }}
      />
      <div className={style.cards}>
        {results
          .filter((result) => result.name.toLowerCase().includes(query.toLowerCase()))
          .map((result, index) => (
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
