import IRandomizer from "../utils/IRandomizer";
import MathRandomizer from "../utils/MathRandomizer";
import Spieces from "./Spieces";
import SpiecesBuilder from "./SpiecesBuilder";
import Neuron from "./Neuron";

class SpiecesBreeder {
  constructor(private randomizer: IRandomizer = new MathRandomizer()) {

  }

  public Breed(mommy: Spieces, daddy: Spieces): Spieces {
    const baby = this.createNewSpieces(mommy);
    this.breedSynapses(baby, mommy, daddy);
    this.breedNeurons(baby.InputNeurons, mommy.InputNeurons, daddy.InputNeurons);
    this.breedNeurons(baby.HiddenNeurons, mommy.HiddenNeurons, daddy.HiddenNeurons);
    this.breedNeurons(baby.OutputNeurons, mommy.OutputNeurons, daddy.OutputNeurons);
    return baby;
  }

  private breedNeurons(babyNeurons: Neuron[], mommyNeurons: Neuron[], daddyNeurons: Neuron[]) {
    for(let i = 0; i < babyNeurons.length; i++) {
      babyNeurons[i].FiringThreshold =
        this.headsOrTails()
          ? mommyNeurons[i].FiringThreshold
          : daddyNeurons[i].FiringThreshold;
    }
  }

  private breedSynapses(baby: Spieces, mommy: Spieces, daddy: Spieces) {
    const babySynapses = baby.Synapses;
    const mommySynapses = mommy.Synapses;
    const daddySynapses = daddy.Synapses;
    for (let i = 0; i < babySynapses.length; i++) {
      babySynapses[i] = this.headsOrTails() ? mommySynapses[i] : daddySynapses[i];
    }
  }

  private headsOrTails(): boolean {
    return this.randomizer.Randomize(0, 1) < .5;
  }

  private createNewSpieces(mommy: Spieces) {
    const babyBuilder = new SpiecesBuilder(this.randomizer);
    const baby = babyBuilder
      .InputNeuronsCount(mommy.InputNeurons.length)
      .OutputNeuronsCount(mommy.OutputNeurons.length)
      .HiddenNeuronsCount(mommy.HiddenNeurons.length)
      .RandomizeSynapses(0, 0)
      .Build();
    return baby;
  }
}

export default SpiecesBreeder;