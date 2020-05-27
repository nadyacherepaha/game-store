const isExcluded = true;

export default function testConst() {
  if (!isExcluded) {
    console.warn("js-dead-code doesn't work properly");
  }
}
