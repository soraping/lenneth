/**
 * service类修饰器，配合@Autowired在其他类中使用
 */
import { Metadata } from "@common";
import { getClassName } from "@utils";
import { LENNETH_SERVICE_PATH } from "@constants";
export const Service = () => {
  return (target: any): void => {
    Metadata.set(
      `${LENNETH_SERVICE_PATH}_${getClassName(target)}`,
      target,
      target
    );
  };
};
