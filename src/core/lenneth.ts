import { LennethApplication } from "./lenneth-application";
import { ILenneth } from "./interfaces";
export class Lenneth extends LennethApplication implements ILenneth {
  start(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(this.listen(8081));
    });
  }
}
