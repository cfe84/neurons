import IActivationFunction from "./IActivationFunction";

class SigmoidActivationFunction implements IActivationFunction{
  public f(input: number): number {
    return 1 / (1 + Math.exp(-input));
  }
}

export default SigmoidActivationFunction;