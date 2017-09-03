import Spieces from "../network/Spieces";
class Generation {
  private spiecesAndFitness: [Spieces, number][] = [];
  constructor(spieces: Spieces[]) {
    for(let spiece of spieces) {
      this.spiecesAndFitness.push([spiece, 0]);
    }
  }

  public SetFitness(spieces: Spieces, fitness: number) {
    const index = this.spiecesAndFitness.findIndex(([spiece, fitness]) => spiece == spieces);
    this.spiecesAndFitness[index][1] = fitness;
    this.spiecesAndFitness.sort(([spieces1, fitness1], [spieces2, fitness2]) => fitness2 - fitness1);
  }

  get Spieces(): Array<Spieces> {
    return this.spiecesAndFitness.map(([spieces, fitness]) => spieces);
  };

  get SpiecesAndFitness(): Array<[Spieces, number]> {
    return this.spiecesAndFitness;
  }
}

export default Generation;