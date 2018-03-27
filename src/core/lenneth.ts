import { LennethApplication } from "./lenneth-application";
import { ILenneth, IServerSettings } from "./interfaces";
import { Metadata } from "./common";
import { SERVER_SETTINGS } from "../constants";
export abstract class Lenneth extends LennethApplication implements ILenneth {
  private _setting: IServerSettings;

  constructor() {
    super();
    this._setting = Metadata.getOwn(SERVER_SETTINGS, this);
  }

  start(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(this.listen(this._setting.port));
    });
  }
}
