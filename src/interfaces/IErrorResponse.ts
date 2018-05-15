import { HttpStatus } from "../common";
export interface IErrorResponse {
  message?: string;
  status?: HttpStatus;
  data?: any;
}
