import Generation from "./Generation";
import Spieces from "../network/Spieces";
import SpiecesBuilder from "../network/SpiecesBuilder";

const should = require("should");
import {} from "mocha";

describe("Generation", () => {
  const builder = new SpiecesBuilder();
  it("saves spieces", () => {
    const spieces: Spieces[] = [ builder.Build(), builder.Build(), builder.Build() ];
    const generation = new Generation(spieces);
    for(let i = 0; i < spieces.length; i++) {
      should(generation.Spieces[i]).equal(spieces[i]);
    }
  });
  it("saves fitness", () => {
    const spieces: Spieces[] = [ builder.Build(), builder.Build(), builder.Build() ];
    const generation = new Generation(spieces);
    generation.SetFitness(spieces[1], 5);
    const spiecesAndFitness = generation.SpiecesAndFitness.find(([sp, fitness]) => sp == spieces[1]);
    if (!spiecesAndFitness) {
      throw should.fail();
    }
    should(spiecesAndFitness[1]).equal(5);
  });
  it("returns sorted spieces", () => {
    const spieces: Spieces[] = [ builder.Build(), builder.Build(), builder.Build() ];
    const generation = new Generation(spieces);
    generation.SetFitness(spieces[0], 2);
    generation.SetFitness(spieces[1], 11);
    generation.SetFitness(spieces[2], 3);
    should(generation.Spieces[0]).equal(spieces[1]);
    should(generation.Spieces[1]).equal(spieces[2]);
    should(generation.Spieces[2]).equal(spieces[0]);
  });
});