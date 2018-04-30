import { Service } from "@decorators";
import { BaseService } from "./base.service";

@Service()
export class ParamsService extends BaseService {
  getName() {
    return "haha";
  }
}
