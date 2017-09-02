import Neuron from "./Neuron";
import Synapse from "./Synapse";

class Spieces {
  constructor(private inputNeurons: Neuron[],
              private hiddenNeurons: Neuron[],
              private outputNeurons: Neuron[],
              private synapses: Synapse[]) {

  }

  get InputNeurons(): Neuron[] {
    return this.inputNeurons;
  };
  get HiddenNeurons(): Neuron[] {
    return this.hiddenNeurons;
  };
  get OutputNeurons(): Neuron[] {
    return this.outputNeurons;
  };
  get Synapses(): Synapse[] {
    return this.synapses;
  };
}

export default Spieces;