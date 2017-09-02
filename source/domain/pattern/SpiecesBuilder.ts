import Spieces from "./Spieces";
import Neuron from "./Neuron";
import Synapse from "./Synapse";


class SpiecesBuilder {
  private inputNeurons: Neuron[];
  private hiddenNeurons: Neuron[];
  private outputNeurons: Neuron[];
  private synapses: Synapse[];

  constructor() {
    this.inputNeurons = [];
    this.hiddenNeurons = [];
    this.outputNeurons = [];
  }

  public InputNeuronsCount(count: number) {
    this.initalizeNeuronArray(count, this.inputNeurons);
  }

  public OutputNeuronsCount(count: number) {
    this.initalizeNeuronArray(count, this.outputNeurons);
  }

  public HiddenNeuronsCount(count: number) {
    this.initalizeNeuronArray(count, this.hiddenNeurons);
  }

  private initalizeNeuronArray(count: number, array: Neuron[]) {
    for (let i = 0; i < count; i++) {
      let neuron = new Neuron();
      array.push(neuron);
    }
  }

  public RandomizeSynapses(minWeight: number, maxWeight: number){
    this.synapses = [];
    this.randomizeSynapsesForNeurons(this.inputNeurons, this.hiddenNeurons, maxWeight, minWeight);
    this.randomizeSynapsesForNeurons(this.hiddenNeurons, this.outputNeurons, maxWeight, minWeight);
  }

  private randomizeSynapsesForNeurons(fromNeurons: Neuron[], toNeurons: Neuron[], maxWeight: number, minWeight: number) {
    for (let fromNeuron of fromNeurons) {
      for (let toNeuron of toNeurons) {
        const weight = (Math.random() * (maxWeight - minWeight)) - minWeight;
        let synapse = new Synapse(toNeuron, weight);
        this.synapses.push(synapse);
        fromNeuron.addSynapse(synapse);
      }
    }
  }

  public Build(): Spieces {
    return new Spieces(this.inputNeurons, this.hiddenNeurons, this.outputNeurons, this.synapses);
  }
}

export default SpiecesBuilder;