/**
 * controller类修饰器
 */
import { Metadata } from "@common";
import { getClass } from "@utils";
export const Controller = (path: string = "/"): ClassDecorator => {
  return (target: any): void => {};
};
