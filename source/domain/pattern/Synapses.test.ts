const should = require("should");
import {} from "mocha";

import Neuron from "./Neuron";
import Synapse from "./Synapse";

describe("Synapses", () => {
  it("sets parameters correctly", () => {
     const neuron = new Neuron();
     const synapse = new Synapse(neuron, 10);

     should(synapse.getEndNeuron()).be.equal(neuron);
     should(synapse.getWeight()).be.equal(10);
  });

  it("sets weight", () => {
    const neuron = new Neuron();
    const synapse = new Synapse(neuron, 10);

    synapse.setWeight(3);

    should(synapse.getWeight()).be.equal(3);
  })
});