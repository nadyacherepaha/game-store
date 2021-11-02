import React, { FC, Fragment } from "react";
import debounce from "lodash.debounce";
import { fetchSearchResults } from "../../utils";
import SearchInput from "./SearchInput";
import CardGame from "../games/card-game/CardGame";
import style from "../games/card-game/cardGame.module.scss";

const fetchData = async (query, cb) => {
  console.log(`fetching ${query}`);
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
                <CardGame
                  id={result.id}
                  name={result.name}
                  image={result.image}
                  description={result.description}
                  ageLimit={result.ageLimit}
                  price={result.price}
                  rating={result.rating}
                  platform={result.platform}
                  alt={result.alt}
                />
              </Fragment>
            </div>
          ))}
      </div>
    </>
  );
};

export default SearchResult;
