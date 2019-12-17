export const valueEs6 = 2;
export function testFn() {
  // this function is excluded from prod-build because of unused
  console.warn("treeShaking for ES6 modules");
}
