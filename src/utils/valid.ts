/**
 * 效验表单
*/
export const asyncAwaitFormList = (arr: any[] = []) => {
  return (
    arr && arr.length>0 &&  Promise.all(arr).then((vals) =>{
      return vals
    })
  )
};

/**
 * 效验手机号
*/
const isValidPhoneNumber = (phoneNumber: string) => {
  const regExp = /^1[0-9]{10}$/;
  return regExp.test(phoneNumber);
}

/**
 * 效验身份证
*/
const isValidId = (card: string) => {
  // 校验规则的正则表达式
  const pattern = /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])\d{3}[\dX]$/;
  // 如果身份证号码不符合规则，则直接返回 false
  if (!pattern.test(card)) {
    return false;
  }
  // 校验身份证号码的最后一位（校验码）
  const checksum = card
    .substr(0, 17)
    .split('')
    .map(Number)
    .reduce((acc, cur, idx) => acc + cur * [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2][idx], 0);
  const checkCode = '10X98765432'[checksum % 11];
  return checkCode === card[17];
}

const isValidEmail = (email: string) => {
  // 校验规则的正则表达式
  const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  // 使用正则表达式进行校验，并返回校验结果
  return pattern.test(email);
}

// 汉字
const isNativePlace = (vals: string) => {
  // 校验规则的正则表达式
  const pattern = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
  // 使用正则表达式进行校验，并返回校验结果
  return pattern.test(vals);
}

// 必须包含数字、汉字、特殊符号/
const isValidString = (vals: string) => {
  // 校验规则的正则表达式/^[\u4e00-\u9fa50-9]+$/
const pattern = /^(?=.*\d)(?=.*[\u4e00-\u9fa5])(?=.*[~!@#$%^&*/])[\d\u4e00-\u9fa5~!@#$%^&*/]{8,}$/;
  // 使用正则表达式进行校验，并返回校验结果
  return pattern.test(vals);
}

export const valid = {
  isValidPhoneNumber,
  isValidId,
  isValidEmail,
  isNativePlace,
  isValidString
}