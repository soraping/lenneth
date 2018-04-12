/**
 * controller类修饰器
 * @Controller("/user")
 * class UserCtroller{
 * }
 */
import { Metadata } from "@common";
import { getClass } from "@utils";
import { PathParamsType } from "@interfaces";
export const Controller = (path: string = "/"): ClassDecorator => {
  return (target: any): void => {};
};
