const should = require("should");
import {} from "mocha";

import Neuron from "./Neuron";
import Synapse from "./Synapse";

describe("Synapse", () => {
  it("sets parameters correctly", () => {
     const neuron = new Neuron();
     const synapse = new Synapse(neuron, 10);

     should(synapse.EndNeuron).be.equal(neuron);
     should(synapse.Weight).be.equal(10);
  });

  it("sets weight", () => {
    const neuron = new Neuron();
    const synapse = new Synapse(neuron, 10);

    synapse.Weight = 3;

    should(synapse.Weight).be.equal(3);
  });

  it("applies weight and calls back", () => {
    let calledBack = false;
    const callback = (syn: Synapse) => calledBack = syn == synapse;
    const neuron = new Neuron();
    const synapse = new Synapse(neuron, 10);
    neuron.AddInboundSynapse(synapse);
    synapse.AddOnStateChangedCallback(callback);

    synapse.Activate(5);

    should(calledBack).be.true();
    should(synapse.Activation).equal(50);
  });
});