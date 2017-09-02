const should = require("should");
import {} from "mocha";

import Neuron from "./Neuron";
import Synapse from "./Synapse";

describe("Neurons",() => {
  it("adds synapses", () => {
    const neuron = new Neuron();
    const synapse = new Synapse(neuron, 0);
    neuron.addSynapse(synapse);

    const synapses = neuron.getSynapses();

    should(synapses.length).be.equal(1);
    should(synapses[0]).be.equal(synapse);
  });
});