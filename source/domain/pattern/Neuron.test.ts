const should = require("should");
import {} from "mocha";

import Neuron from "./Neuron";
import Synapse from "./Synapse";

describe("Neuron",() => {
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

  it("does not manually fire when there are inbound synapses", () => {

  });

  it("fires on synapse weight sufficient", () => {
    const synapse1Weight = 3,
      synapse2Weight = 4,
      threshold = 5;

    const neuron = new Neuron();
    neuron.FiringThreshold = threshold;
    const neglectedNeuron = new Neuron();
    const inboundSynapse1 = new Synapse(neuron, synapse1Weight);
    const inboundSynapse2 = new Synapse(neuron, synapse2Weight);
    const outboundSynapse = new Synapse(neglectedNeuron, 10);
    neuron.AddInboundSynapse(inboundSynapse1);
    neuron.AddInboundSynapse(inboundSynapse2);
    neuron.AddOutboundSynapse(outboundSynapse);

    let testFiring = function (synapse1Firing: boolean, synapse2Firing: boolean, expectFiring: boolean) {
      if (synapse1Firing) {
        inboundSynapse1.Fire();
      } else {
        inboundSynapse1.Shutdown();
      }
      if (synapse2Firing) {
        inboundSynapse2.Fire();
      } else {
        inboundSynapse2.Shutdown();
      }

      should(neuron.Firing).equal(expectFiring);
      should(outboundSynapse.Firing).equal(expectFiring);
    };
    testFiring(true, true, true);
    testFiring(false, true, false);
    testFiring(true, false, false);
    testFiring(false, false, false);
    testFiring(true, true, true);
  });
});