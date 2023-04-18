import { KktproKeys } from '@kkt/pro';
import { valid } from '@/utils/valid';

interface FormListProps {
  data?: any;
}

export const ModalTitle: KktproKeys = {
  add: '新增家庭成员',
  edit: '编辑家庭成员'
}

// const disabledDate = (currentDate: Date) => {
//   // 今天和今天之前不能选择
//   return currentDate && currentDate.valueOf() < Date.now();
// }

export const formList = (props?: FormListProps) => {
  const { data } = props || {};
  return [
    {
      label: "姓名",
      key: "name",
      widget: "input",
      required: true,
      initialValue: data?.name,
      span: "12",
      readSpan: 1,
      rules: [
        { required: true, message: '请输入姓名' },
      ],
    },
    {
      label: "手机号",
      key: "memberPhone",
      widget: "input",
      initialValue: data?.memberPhone,
      span: "12",
      readSpan: 1,
      rules: [
        { 
          validator: (value: string) => {
            if (value) {
              return valid.isValidPhoneNumber(value);
            }
            return true;
          },
          message: '请填写正确的手机号'
        }
      ],
    },
    {
      label: "年龄",
      key: "age",
      widget: "input",
      initialValue: data?.age,
      span: "12",
      readSpan: 1,
    },
    {
      label: "关系",
      key: "relation",
      widget: "input",
      initialValue: data?.relation,
      span: "12",
      readSpan: 1,
    },
    {
      label: "现工作单位及职务",
      key: "desc",
      widget: "input",
      initialValue: data?.desc,
      span: "24",
      readSpan: 1,
    },
  ]
}