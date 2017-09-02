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

  public setWeight(weight: number) {
    this.weight = weight;
  }
}

export default Synapse;