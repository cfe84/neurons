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

  it("fires correctly and calls back", () => {
    let calledBack = false;
    const callback = (syn: Synapse) => calledBack = syn == synapse;
    const neuron = new Neuron();
    const synapse = new Synapse(neuron, 10);
    neuron.AddInboundSynapse(synapse);
    synapse.AddOnStateChangedCallback(callback);

    synapse.Fire();

    should(calledBack).be.true();
    should(synapse.Firing).be.true();
  });

  it("shuts down correctly and calls back", () => {
    let calledBack = false;
    const callback = (syn: Synapse) => calledBack = syn == synapse;
    const neuron = new Neuron();
    const synapse = new Synapse(neuron, 10);
    neuron.AddInboundSynapse(synapse);
    synapse.AddOnStateChangedCallback(callback);

    synapse.Shutdown();

    should(calledBack).be.true();
    should(synapse.Firing).be.false();
  });
});