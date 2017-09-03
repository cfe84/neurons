import Neuron from "./Neuron";

class Synapse {
  private endNeuron: Neuron;
  private weight: number;
  private activation: number;
  private onStateChangedCallbacks: Array<Function> = [];

  constructor(endNeuron: Neuron, weight: number) {
    this.endNeuron = endNeuron;
    this.weight = weight;
  }

  public AddOnStateChangedCallback(callback: Function) {
    this.onStateChangedCallbacks.push(callback);
  }

  private onStateChanged() {
    this.onStateChangedCallbacks.forEach((callback) => callback(this));
  }

  public Activate(input: number) : void {
    this.activation = input * this.weight;
    this.onStateChanged();
  }

  get EndNeuron(): Neuron {
    return this.endNeuron;
  }

  get Weight(): number {
    return this.weight;
  }

  set Weight(value: number) {
    this.weight = value;
  }

  get Activation(): number {
    return this.activation;
  }
}

export default Synapse;