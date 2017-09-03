import Synapse from "./Synapse";
import IActivationFunction from "./IActivationFunction";
import SigmoidActivationFunction from "./SigmoidActivationFunction";

class Neuron {
  private outboundSynapses: Synapse[];
  private inboundSynapses: Synapse[];
  private activation: number = 0;
  private firingThreshold: number = 0;
  private activationFunction: IActivationFunction;

  constructor(activationFunction: IActivationFunction = new SigmoidActivationFunction()) {
    this.outboundSynapses = [];
    this.inboundSynapses = [];
    this.activationFunction = activationFunction;
  }

  private activate(input: number) {
    const activation = this.activationFunction.f(input);
    const activated = activation >= this.firingThreshold;
    this.activation = activated ? activation : 0;
    this.outboundSynapses.forEach((synapse) => synapse.Activate(this.activation));
  }

  private checkInboundSynapses() {
    if (this.inboundSynapses.length != 0) {
      throw Error("Can manually trigger neuron with inbound synapses");
    }
  }

  public Fire(input: number) : void {
    this.checkInboundSynapses();
    this.activate(input);
  }

  private OnInboundSynapseStateChanged(): void {
    const synapsesActivationSum = this.inboundSynapses.reduce(
      (sum, synapse) => sum + synapse.Activation, 0);
    this.activate(synapsesActivationSum);
  }

  public AddOutboundSynapse(synapse: Synapse) {
    this.outboundSynapses.push(synapse);
  }

  public AddInboundSynapse(synapse: Synapse) {
    this.inboundSynapses.push(synapse);
    synapse.AddOnStateChangedCallback(() => this.OnInboundSynapseStateChanged())
  }

  get OutboundSynapses(): Synapse[] {
    return this.outboundSynapses;
  }

  get InboundSynapses(): Synapse[] {
    return this.inboundSynapses;
  }

  set FiringThreshold(threshold: number) {
    this.firingThreshold = threshold;
  }

  get FiringThreshold(): number {
    return this.firingThreshold;
  }

  get Activation(): number {
    return this.activation;
  }
}

export default Neuron;