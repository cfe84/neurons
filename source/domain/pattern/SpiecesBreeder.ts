import IRandomizer from "../utils/IRandomizer";
import MathRandomizer from "../utils/MathRandomizer";
import Spieces from "./Spieces";
import SpiecesBuilder from "./SpiecesBuilder";

class SpiecesBreeder {
  constructor(private randomizer: IRandomizer = new MathRandomizer()) {

  }

  public Breed(mommy: Spieces, daddy: Spieces): Spieces {
    const baby = this.createNewSpieces(mommy);
    this.breedSynapses(baby, mommy, daddy);
    return baby;
  }

  private breedSynapses(baby: Spieces, mommy: Spieces, daddy: Spieces) {
    const babySynapses = baby.Synapses;
    const mommySynapses = mommy.Synapses;
    const daddySynapses = daddy.Synapses;
    const headsOrTails = () => this.randomizer.Randomize(0, 1) < .5;
    for (let i = 0; i < babySynapses.length; i++) {
      babySynapses[i] = headsOrTails() ? mommySynapses[i] : daddySynapses[i];
    }
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