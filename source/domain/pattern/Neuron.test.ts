const should = require("should");
import {} from "mocha";

import Neuron from "./Neuron";
import Synapse from "./Synapse";

describe("Neurons",() => {
  it("adds outbound synapses", () => {
    const neuron = new Neuron();
    const synapse = new Synapse(neuron, 0);
    neuron.AddOutboundSynapse(synapse);

    should(neuron.OutboundSynapses).have.length(1);
    should(neuron.OutboundSynapses[0]).be.equal(synapse);
    should(neuron.InboundSynapses).have.length(0);
  });

  it("adds inbound synapses", () => {
    const neuron = new Neuron();
    const synapse = new Synapse(neuron, 0);
    neuron.AddInboundSynapse(synapse);

    should(neuron.InboundSynapses).have.length(1);
    should(neuron.InboundSynapses[0]).be.equal(synapse);
    should(neuron.OutboundSynapses).have.length(0);
  });
});