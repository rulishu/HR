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

export const valid = {
  isValidPhoneNumber,
}