import IRandomizer from "../utils/IRandomizer";
import MathRandomizer from "../utils/MathRandomizer";
import Spieces from "./Spieces";
import SpiecesBuilder from "./SpiecesBuilder";

class SpiecesBreader {
  constructor(private randomizer: IRandomizer = new MathRandomizer()) {

  }

  public Breed(mommy: Spieces, daddy: Spieces): Spieces {
    const baby = this.createNewSpieces(mommy);
    const babySynapses = baby.getSynapses();
    const mommySynapses = mommy.getSynapses();
    const daddySynapses = daddy.getSynapses();
    const headsOrTails = () => this.randomizer.Randomize(0, 1) > .5;
    for(let i = 0; i < babySynapses.length; i++) {
      babySynapses[i] = headsOrTails() ? mommySynapses[i] : daddySynapses[i];
    }
  }

  private createNewSpieces(mommy: Spieces) {
    const babyBuilder = new SpiecesBuilder(this.randomizer);
    const baby = babyBuilder
      .InputNeuronsCount(mommy.getInputNeurons().length)
      .OutputNeuronsCount(mommy.getOutputNeurons().length)
      .HiddenNeuronsCount(mommy.getHiddenNeurons().length)
      .RandomizeSynapses(0, 0)
      .Build();
    return baby;
  }
}

export default SpiecesBreader;