import Spieces from "./Spieces";
const should = require("should");
import {} from "mocha";
import SpiecesBuilder from "./SpiecesBuilder";
import * as TypeMoq from "typemoq";
import IRandomizer from "../utils/IRandomizer";
import SpiecesBreeder from "./SpiecesBreeder";

let createSpieces = function (weight: number) {
  const randomizer = TypeMoq.Mock.ofType<IRandomizer>();
  randomizer.setup(
    (randomizer) => randomizer.Randomize(TypeMoq.It.isAny(), TypeMoq.It.isAny()))
    .returns(() => weight);
  const mommy = new SpiecesBuilder(randomizer.object)
    .InputNeuronsCount(1, 0, 5)
    .HiddenNeuronsCount(1, 0, 5)
    .OutputNeuronsCount(1, 0, 5)
    .RandomizeSynapses(1, 4)
    .Build();
  return mommy;
};

describe("Spieces breeder", () => {
  const mommysWeight = 2;
  const daddysWeight = 4;
  let mommy: Spieces, daddy: Spieces;

  before(() => {
    mommy = createSpieces(mommysWeight);
    daddy = createSpieces(daddysWeight);
  });

  it("mixes mommy and daddy", () => {
    const breeder = new SpiecesBreeder();
    for(let t = 0; t < 10; t++) {
      const baby = breeder.Breed(mommy, daddy);
      should(baby.InputNeurons).have.length(1);
      should(baby.HiddenNeurons).have.length(1);
      should(baby.OutputNeurons).have.length(1);
      const synapses = baby.Synapses;
      should(synapses).have.length(2);
      for (let i = 0; i < 2; i++) {
        should([mommy.Synapses[i].Weight, daddy.Synapses[i].Weight]).containEql(synapses[i].Weight);
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
      should(baby.Synapses[i].Weight).equal(mommy.Synapses[i].Weight)
    }
    should(baby.InputNeurons[0].FiringThreshold).not.be.undefined();
    should(baby.InputNeurons[0].FiringThreshold).equal(mommy.InputNeurons[0].FiringThreshold);
    should(baby.HiddenNeurons[0].FiringThreshold).equal(mommy.HiddenNeurons[0].FiringThreshold);
    should(baby.OutputNeurons[0].FiringThreshold).equal(mommy.OutputNeurons[0].FiringThreshold);
  });

  it("copies the weights from daddy", () => {
    const randomizer = TypeMoq.Mock.ofType<IRandomizer>();
    // .72 returns tails every time, and heads is daddy
    randomizer.setup((randomizer) => randomizer.Randomize(0, 1)).returns(() => .72);
    const breeder = new SpiecesBreeder(randomizer.object);
    const baby = breeder.Breed(mommy, daddy);
    for(let i = 0; i < 2; i++) {
      should(baby.Synapses[i].Weight).equal(daddy.Synapses[i].Weight)
    }
    should(baby.InputNeurons[0].FiringThreshold).equal(daddy.InputNeurons[0].FiringThreshold);
    should(baby.HiddenNeurons[0].FiringThreshold).equal(daddy.HiddenNeurons[0].FiringThreshold);
    should(baby.OutputNeurons[0].FiringThreshold).equal(daddy.OutputNeurons[0].FiringThreshold);
  });
});