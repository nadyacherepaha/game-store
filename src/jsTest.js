export default function jsTest() {
  // array requires for checking babel-transform for IE
  console.warn(["jsTested", ""].find((v) => v === "jsTested"));
}
