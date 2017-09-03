import SigmoidActivationFunction from "./SigmoidActivationFunction";
const should = require("should");
import {} from "mocha";

describe("Sigmoid activation function", () => {
  const func = new SigmoidActivationFunction();
  it("returns .5 for 0",  () => {
    should(func.f(0)).equal(.5);
  });
  it("is bound by 0, 1", () => {
    const probes: number[] = [-1002, -2140312, -123, -5, -2, -1, -0.5, -0.0001,
      0.0001, 0.5, 0.75, 1, 2, 5, 10, 100, 1242432424, 2342342];
    for(let val of probes) {
      should(func.f(val)).be.within(0, 1);
    }
  })
});