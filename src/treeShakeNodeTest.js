module.exports.valueNodeJs = 2;
module.exports.testFn = function testFn() {
  // this function is not excluded from prod-build because of unused
  console.warn("treeShaking for Node.js modules");
};
