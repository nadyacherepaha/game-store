export const BASE_URL = "http://localhost:8079/games?";
export const fetchSearchResults = async (query) => {
  if (query && query.length > 0) {
    const parsedQuery = query.replaceAll(" ", "+");
    const url = `${BASE_URL}/games?search=${parsedQuery}`;
    const res = await fetch(url);
    const resJson = res.json();
    return resJson;
  }
  return [];
};
