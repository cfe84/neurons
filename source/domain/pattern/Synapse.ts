import Neuron from "./Neuron";

class Synapse {
  private endNeuron: Neuron;
  private weight: Number;

  constructor(endNeuron: Neuron, weight: Number) {
    this.endNeuron = endNeuron;
    this.weight = weight;
  }

  public getEndNeuron(): Neuron {
    return this.endNeuron;
  }

  public getWeight(): Number {
    return this.weight;
  }
}

export default Synapse;