import Neuron from "./Neuron";
import Synapse from "./Synapse";

class Spieces {
  private inputNeurons: Neuron[];
  private hiddenNeurons: Neuron[];
  private outputNeurons: Neuron[];
  private synapses: Synapse[];

  constructor(inputNeurons: Neuron[],
              hiddenNeurons: Neuron[],
              outputNeurons: Neuron[],
              synapses: Synapse[]) {
    this.inputNeurons = inputNeurons;
    this.hiddenNeurons = hiddenNeurons;
    this.outputNeurons = outputNeurons;
    this.synapses = synapses;
  }
}

export default Spieces;