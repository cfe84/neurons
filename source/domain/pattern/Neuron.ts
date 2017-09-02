import Synapse from "./Synapse";

class Neuron {
  private synapses: Synapse[];

  constructor() {
    this.synapses = [];
  }

  public addSynapse(synapse: Synapse) {
    this.synapses.push(synapse);
  }

  public getSynapses(): Synapse[] {
    return this.synapses;
  }
}

export default Neuron;