import SpiecesBreeder from "../network/SpiecesBreeder";
import SpiecesBuilder from "../network/SpiecesBuilder";
import Generation from "./Generation";
import Spieces from "../network/Spieces";
class Evolver {
  private generations: Generation[] = [];

  constructor(initialPopulation: number,
              inputNeuronsCount: number,
              hiddenNeuronsCount: number,
              outputNeuronsCount: number,
              synapseWeightSpan: [number, number],
              neuronThresholdSpan: [number, number]) {
    const spiecesList: Spieces[] = [];
    for(let i = 0; i < initialPopulation; i++) {
      const builder = new SpiecesBuilder();
      const spieces = builder
        .InputNeuronsCount(inputNeuronsCount, neuronThresholdSpan[0], neuronThresholdSpan[1])
        .HiddenNeuronsCount(hiddenNeuronsCount, neuronThresholdSpan[0], neuronThresholdSpan[1])
        .OutputNeuronsCount(outputNeuronsCount, neuronThresholdSpan[0], neuronThresholdSpan[1])
        .RandomizeSynapses(synapseWeightSpan[0], synapseWeightSpan[1])
        .Build();
      spiecesList.push(spieces);
    }
    const generation = new Generation(spiecesList);
    this.generations.push(generation);
  }

  get Generation(): Array<Generation> {
    return this.generations;
  }
}

export default Evolver;