import { KktproKeys } from '@kkt/pro';
import { valid } from '@/utils/valid';

interface FormListProps {
  data?: any,
  dictObject?: any,
  handleChange?: () => void
}

export const ModalTitle: KktproKeys = {
  add: '新增简历',
  edit: '编辑简历'
}

export const formList = (props?: FormListProps) => {
  const { data, dictObject, handleChange } = props || {};
  return [
    {
      label: "姓名",
      key: "name",
      widget: "input",
      required: true,
      initialValue: data?.name,
      // span: "12",
      // readSpan: 1,
      rules: [
        { required: true, message: '请输入姓名' },
      ],
    },
    {
      label: "性别",
      key: "gender",
      widget: "radio",
      option: dictObject['sex']?.child || [],
      initialValue: data?.gender,
      // rules: [
      //   { required: true, message: '请选择性别' },
      // ],
    },
    {
      label: "手机号",
      key: "phone",
      widget: "input",
      initialValue: data?.phone,
      rules: [
        { required: true, message: '请填写手机号' },
        {
          validator: (value: any) => {
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
      // span: "12",
      // readSpan: 1,
    },
    {
      label: "工作经验（年）",
      key: "experience",
      widget: "input",
      initialValue: data?.experience,
      // span: "12",
      // readSpan: 1,
    },
    {
      label: "学历",
      key: "educational",
      widget: "select",
      option: dictObject['education']?.child || [],
      initialValue: data?.educational,
      // rules: [
      //   { required: true, message: '请选择学历' },
      // ],
    },
    {
      label: "应聘岗位",
      key: "post",
      widget: "select",
      option: dictObject['post']?.child || [],
      initialValue: data?.post,
      // rules: [
      //   { required: true, message: '请选择入职岗位' },
      // ],
    },
    {
      label: "E-mail",
      key: "email",
      widget: "input",
      initialValue: data?.email,
      // rules: [
      //   { required: true, message: '请填写邮箱' },
      //   { 
      //     validator: (value: any) => {
      //       if (value) {
      //         return valid.isValidEmail(value);
      //       }
      //       return true;
      //     },
      //     message: '请填写正确的邮箱'
      //   }
      // ],
    },
    {
      label: "现居地址",
      key: "livingPlace",
      widget: "input",
      initialValue: data?.livingPlace,
      // rules: [
      //   { required: true, message: '请填写现居地址' },
      // ],
      // span: 16,
      // readSpan: 2
    },
    {
      label: '上传简历',
      key: 'upload',
      widget: 'upload',
      span: '24',
      readSpan: 3,
      widgetProps: {
        onChange: handleChange,
        uploadType: 'text',
        multiple: true,
        maxNumber: 1,
        showFileIcon: {
          showPreviewIcon: true,
          showRemoveIcon: true,
        },
      },
    },
  ]
}