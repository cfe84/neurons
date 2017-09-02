import IRandomizer from "./IRandomizer";

class MathRandomizer implements IRandomizer {
  constructor() {

  }

  public Randomize(min: number, max: number): number {
    return (Math.random() * (max - min)) + min;
  }
}

export default MathRandomizer;