import { KktproKeys } from "@kkt/pro";

/**
 * 获取字典数据对应的 label
*/
export const getDictLabel = (data: KktproKeys[] = [], value: string | number) => {
  const obj = data.find((item) => item.value === value) || {};
  return obj.label;
}

/**
 * formPro不支持undefined
 * undefined 转换 string
*/
export const undefinedToString = (data: KktproKeys = {}) => {
  const obj = { ...data };
  for (let i in obj) {
    obj[i] = obj[i] || ''
  }
  return obj;
}