import Synapse from "./Synapse";

class Neuron {
  private outboundSynapses: Synapse[];
  private inboundSynapses: Synapse[];
  private firing: boolean = false;
  private firingThreshold: number = 0;

  constructor() {
    this.outboundSynapses = [];
    this.inboundSynapses = [];
  }

  private triggerState(firing: boolean) {
    this.firing = firing;
    this.outboundSynapses.forEach((synapse) => this.firing ? synapse.Fire() : synapse.Shutdown());
  }

  private checkInboundSynapses() {
    if (this.inboundSynapses.length != 0) {
      throw Error("Can manually trigger neuron with inbound synapses");
    }
  }

  public Fire() : void {
    this.checkInboundSynapses();
    this.triggerState(true);
  }

  public Shutdown(): void {
    this.checkInboundSynapses();
    this.triggerState(false);
  }

  private OnInboundSynapseStateChanged(): void {
    const firingSynapsesWeightSum = this.inboundSynapses.reduce(
      (sum, synapse) => sum + (synapse.Firing ? synapse.Weight : 0)
      , 0);
    const shouldFire = firingSynapsesWeightSum > this.firingThreshold;
    this.triggerState(shouldFire);
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

  get Firing(): boolean {
    return this.firing;
  }
}

export default Neuron;