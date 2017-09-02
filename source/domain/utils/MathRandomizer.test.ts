const should = require("should");
import {} from "mocha";

import MathRandomizer from "./MathRandomizer";

describe("MathRandomizer", () => {
  it("Returns between min and max", () => {
    const randomizer = new MathRandomizer();
    const values = [];
    for (let i = 0; i < 100; i++) {

      const value = randomizer.Randomize(-5, 5);
      should(value).be.within(-5, 5);
      should(values).not.containEql(value);

      values.push(value);
    }
  });
});