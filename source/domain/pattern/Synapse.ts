import Neuron from "./Neuron";

class Synapse {
  private endNeuron: Neuron;
  private weight: number;
  private firing: boolean;
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

  public Fire() : void {
    this.firing = true;
    this.onStateChanged();
  }

  public Shutdown(): void {
    this.firing = false;
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

  get Firing(): boolean {
    return this.firing;
  }
}

export default Synapse;