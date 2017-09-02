import Neuron from "./Neuron";
import Synapse from "./Synapse";

class Spieces {
  constructor(private inputNeurons: Neuron[],
              private hiddenNeurons: Neuron[],
              private outputNeurons: Neuron[],
              private synapses: Synapse[]) {

  }

  public getInputNeurons(): Neuron[] {
    return this.inputNeurons;
  };
  public getHiddenNeurons(): Neuron[] {
    return this.hiddenNeurons;
  };
  public getOutputNeurons(): Neuron[] {
    return this.outputNeurons;
  };
  public getSynapses(): Synapse[] {
    return this.synapses;
  };
}

export default Spieces;