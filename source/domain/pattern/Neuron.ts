import Synapse from "./Synapse";

class Neuron {
  private outboundSynapses: Synapse[];
  private inboundSynapses: Synapse[];

  constructor() {
    this.outboundSynapses = [];
    this.inboundSynapses = [];
  }

  public AddOutboundSynapse(synapse: Synapse) {
    this.outboundSynapses.push(synapse);
  }

  get OutboundSynapses(): Synapse[] {
    return this.outboundSynapses;
  }

  get InboundSynapses(): Synapse[] {
    return this.inboundSynapses;
  }

  public AddInboundSynapse(value: Synapse) {
    this.inboundSynapses.push(value);
  }
}

export default Neuron;