import Spieces from "./Spieces";
const should = require("should");
import {} from "mocha";
import SpiecesBuilder from "./SpiecesBuilder";
import * as TypeMoq from "typemoq";
import IRandomizer from "../utils/IRandomizer";
import SpiecesBreeder from "./SpiecesBreeder";

let createSpieces = function (weight: number) {
  const randomizer = TypeMoq.Mock.ofType<IRandomizer>();
  randomizer.setup((randomizer) => randomizer.Randomize(1, 4)).returns(() => weight);
  const mommy = new SpiecesBuilder(randomizer.object)
    .InputNeuronsCount(1)
    .HiddenNeuronsCount(1)
    .OutputNeuronsCount(1)
    .RandomizeSynapses(1, 4)
    .Build();
  return mommy;
};

describe("Spieces breeder", () => {
  const mommysWeight = 2;
  const daddysWeight = 4;
  let mommy = createSpieces(mommysWeight);
  let daddy = createSpieces(daddysWeight);

  before(() => {
    mommy = createSpieces(mommysWeight);
    daddy = createSpieces(daddysWeight);
  });

  it("mixes mommy and daddy", () => {
    const breeder = new SpiecesBreeder();
    for(let t = 0; t < 10; t++) {
      const baby = breeder.Breed(mommy, daddy);
      should(baby.getInputNeurons()).have.length(1);
      should(baby.getHiddenNeurons()).have.length(1);
      should(baby.getOutputNeurons()).have.length(1);
      const synapses = baby.getSynapses();
      should(synapses).have.length(2);
      for (let i = 0; i < 2; i++) {
        should([mommy.getSynapses()[i].getWeight(), daddy.getSynapses()[i].getWeight()]).containEql(synapses[i].getWeight());
      }
    }
  });

  it("copies the weights from mommy", () => {
    const randomizer = TypeMoq.Mock.ofType<IRandomizer>();
    // .2 returns heads every time, and heads is mommy
    randomizer.setup((randomizer) => randomizer.Randomize(0, 1)).returns(() => .2);
    const breeder = new SpiecesBreeder(randomizer.object);
    const baby = breeder.Breed(mommy, daddy);
    for(let i = 0; i < 2; i++) {
      should(baby.getSynapses()[i].getWeight()).equal(mommy.getSynapses()[i].getWeight())
    }
  });

  it("copies the weights from daddy", () => {
    const randomizer = TypeMoq.Mock.ofType<IRandomizer>();
    // .72 returns tails every time, and heads is daddy
    randomizer.setup((randomizer) => randomizer.Randomize(0, 1)).returns(() => .72);
    const breeder = new SpiecesBreeder(randomizer.object);
    const baby = breeder.Breed(mommy, daddy);
    for(let i = 0; i < 2; i++) {
      should(baby.getSynapses()[i].getWeight()).equal(daddy.getSynapses()[i].getWeight())
    }
  });
});