import Spieces from "./Spieces";
import Neuron from "./Neuron";
import Synapse from "./Synapse";
import IRandomizer from "../utils/IRandomizer";
import MathRandomizer from "../utils/MathRandomizer";


class SpiecesBuilder {
  private inputNeurons: Neuron[];
  private hiddenNeurons: Neuron[];
  private outputNeurons: Neuron[];
  private synapses: Synapse[];

  constructor(private randomizer: IRandomizer = new MathRandomizer()) {
    this.inputNeurons = [];
    this.hiddenNeurons = [];
    this.outputNeurons = [];
  }

  public InputNeuronsCount(count: number, minThreshold: number = 0, maxThreshold: number = 0): SpiecesBuilder {
    this.initalizeNeuronArray(count, this.inputNeurons, minThreshold, maxThreshold);
    return this;
  }

  public OutputNeuronsCount(count: number, minThreshold: number = 0, maxThreshold: number = 0): SpiecesBuilder {
    this.initalizeNeuronArray(count, this.outputNeurons, minThreshold, maxThreshold);
    return this;
  }

  public HiddenNeuronsCount(count: number, minThreshold: number = 0, maxThreshold: number = 0): SpiecesBuilder {
    this.initalizeNeuronArray(count, this.hiddenNeurons, minThreshold, maxThreshold);
    return this;
  }

  private initalizeNeuronArray(count: number, array: Neuron[], minThreshold: number, maxThreshold: number) {
    for (let i = 0; i < count; i++) {
      let neuron = new Neuron();
      neuron.FiringThreshold = this.randomizer.Randomize(minThreshold, maxThreshold);
      array.push(neuron);
    }
  }

  public RandomizeSynapses(minWeight: number, maxWeight: number): SpiecesBuilder{
    this.synapses = [];
    this.randomizeSynapsesForNeurons(this.inputNeurons, this.hiddenNeurons, maxWeight, minWeight);
    this.randomizeSynapsesForNeurons(this.hiddenNeurons, this.outputNeurons, maxWeight, minWeight);
    return this;
  }

  private randomizeSynapsesForNeurons(fromNeurons: Neuron[], toNeurons: Neuron[], maxWeight: number, minWeight: number) {
    for (let fromNeuron of fromNeurons) {
      for (let toNeuron of toNeurons) {
        const weight = this.randomizer.Randomize(minWeight, maxWeight);
        let synapse = new Synapse(toNeuron, weight);
        this.synapses.push(synapse);
        fromNeuron.AddOutboundSynapse(synapse);
        toNeuron.AddInboundSynapse(synapse);
      }
    }
  }

  public Build(): Spieces {
    return new Spieces(this.inputNeurons, this.hiddenNeurons, this.outputNeurons, this.synapses);
  }
}

export default SpiecesBuilder;