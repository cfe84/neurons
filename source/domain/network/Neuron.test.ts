import IActivationFunction from "./IActivationFunction";
const should = require("should");
import {} from "mocha";
import * as TypeMoq from "typemoq";

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
    const neuron = new Neuron();
    const synapse = new Synapse(neuron, 0);
    neuron.AddInboundSynapse(synapse);

    should(() => neuron.Fire(1)).throwError("Can manually trigger neuron with inbound synapses");
  });

  it("fires on synapse weight sufficient", () => {
    const synapse1Weight = 2,
      synapse2Weight = 3,
      threshold = 10,
      outputSynapseWeight = 5;
    // Activation level 1, activation level 2, expected result
    const testData = [
      [1, 1, 0], // returns 5, is under threshold
      [2, 1, 0], // returns 7, is under threshold
      [2, 2, 10], // returns 10, is over threshold
      [3, 3, 15], // returns 15, is over threshold
      [0, 5, 15], // returns 15, is over threshold
      [0, 1, 0], // returns 3, is under threshold
    ];


    const activationFunction = TypeMoq.Mock.ofType<IActivationFunction>();
    activationFunction.setup((func) => func.f(TypeMoq.It.isAnyNumber())).returns((num) => num);

    const neuron = new Neuron(activationFunction.object);
    neuron.FiringThreshold = threshold;
    const neglectedNeuron = new Neuron();
    const inboundSynapse1 = new Synapse(neuron, synapse1Weight);
    const inboundSynapse2 = new Synapse(neuron, synapse2Weight);
    const outboundSynapse = new Synapse(neglectedNeuron, outputSynapseWeight);
    neuron.AddInboundSynapse(inboundSynapse1);
    neuron.AddInboundSynapse(inboundSynapse2);
    neuron.AddOutboundSynapse(outboundSynapse);

    let testFiring = function (synapse1Level: number, synapse2Level: number, expected: number) {
      inboundSynapse1.Activate(synapse1Level);
      inboundSynapse2.Activate(synapse2Level);
      should(neuron.Activation).equal(expected);
      should(outboundSynapse.Activation).equal(expected * outputSynapseWeight);
    };
    for (let [synapse1, synapse2, expected] of testData) {
      testFiring(synapse1, synapse2, expected);
    }
  });
});