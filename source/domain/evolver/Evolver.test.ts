import Evolver from "./Evolver";
const should = require("should");
import {} from "mocha";

describe("Evolver", () => {
  it("generates first population", () => {
    const initialPopulation = 10,
      inputNeuronsCount = 1,
      hiddenNeuronsCount = 3,
      outputNeuronsCount = 2,
      synapseWeight = 5,
      neuronThreshold = 2;
    const evolver = new Evolver(
      initialPopulation,
      inputNeuronsCount,
      hiddenNeuronsCount,
      outputNeuronsCount,
      [synapseWeight, synapseWeight],
      [neuronThreshold, neuronThreshold]
    );

    should(evolver.Generation).have.length(1);
    should(evolver.Generation[0].Spieces).have.length(initialPopulation);
    should(evolver.Generation[0].Spieces[2].InputNeurons).have.length(inputNeuronsCount);
    should(evolver.Generation[0].Spieces[2].HiddenNeurons).have.length(hiddenNeuronsCount);
    should(evolver.Generation[0].Spieces[3].OutputNeurons).have.length(outputNeuronsCount);
    should(evolver.Generation[0].Spieces[2].HiddenNeurons[0].InboundSynapses[0].Weight).equal(synapseWeight);
    should(evolver.Generation[0].Spieces[3].HiddenNeurons[0].FiringThreshold).equal(neuronThreshold);
  });
});