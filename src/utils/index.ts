import { KktproKeys } from "@kkt/pro";

/**
 * 获取字典数据对应的 label
*/
export const getDictLabel = (data: KktproKeys[] = [], value: string | number) => {
  const obj = data.find((item) => item.value === value) || {};
  return obj.label;
}