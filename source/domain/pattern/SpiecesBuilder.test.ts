import SpiecesBuilder from "./SpiecesBuilder";
const should = require("should");
import {} from "mocha";
import IRandomizer from "../utils/IRandomizer";
import * as TypeMoq from "typemoq";

describe("Spieces builder", () => {
  it("sets the neurons", () => {
    const builder = new SpiecesBuilder();
    const spieces = builder
      .InputNeuronsCount(5)
      .HiddenNeuronsCount(3)
      .OutputNeuronsCount(2)
      .Build();

    should(spieces.getInputNeurons()).have.length(5);
    should(spieces.getHiddenNeurons()).have.length(3);
    should(spieces.getOutputNeurons()).have.length(2);
    should(spieces.getSynapses()).be.undefined();
  });

  it("should randomize the synapses", () => {
    const randomizer = TypeMoq.Mock.ofType<IRandomizer>();
    randomizer.setup((rand) => rand.Randomize(-6, 6)).returns(() => 3);
    const builder = new SpiecesBuilder(randomizer.object);
    const spieces = builder
      .OutputNeuronsCount(1)
      .HiddenNeuronsCount(1)
      .InputNeuronsCount(1)
      .RandomizeSynapses(-6, 6)
      .Build();

    const synapses = spieces.getSynapses();
    should(synapses).have.length(2);
    for (let i = 0; i < 2; i++) {
      should(synapses[i].getWeight()).equal(3);
    }
  });

  it("should set synapses correct in the neurons", () => {
    const builder = new SpiecesBuilder();
    const spieces = builder
      .OutputNeuronsCount(1)
      .HiddenNeuronsCount(1)
      .InputNeuronsCount(1)
      .RandomizeSynapses(2, 2)
      .Build();
  });
});