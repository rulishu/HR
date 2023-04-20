import { valid } from '@/utils/valid';

export const formList = (
  formData: any,
  handleChange: () => void,
  dictObject: any,
) => {

  return [
    {
      label: "姓名",
      key: "name",
      widget: "input",
      required: true,
      initialValue: formData?.name,
      span: "24",
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
      initialValue: formData?.gender,
      span: "24",
      // rules: [
      //   { required: true, message: '请选择性别' },
      // ],
    },
    {
      label: "手机号",
      key: "phone",
      widget: "input",
      initialValue: formData?.phone,
      span: "24",
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
      widget: "inputNumber",
      initialValue: formData?.age,
      span: "24",
      // readSpan: 1,
    },
    {
      label: "工作经验（年）",
      key: "experience",
      widget: "inputNumber",
      initialValue: formData?.experience,
      span: "24",
      // readSpan: 1,
    },
    {
      label: "学历",
      key: "educational",
      widget: "select",
      option: dictObject['education']?.child || [],
      initialValue: formData?.educational,
      span: "24",
      // rules: [
      //   { required: true, message: '请选择学历' },
      // ],
    },
    {
      label: "应聘岗位",
      key: "post",
      widget: "select",
      option: dictObject['post']?.child || [],
      initialValue: formData?.post,
      span: "24",
      // rules: [
      //   { required: true, message: '请选择入职岗位' },
      // ],
    },
    {
      label: "E-mail",
      key: "email",
      widget: "input",
      initialValue: formData?.email,
      span: "24",
      rules: [
        // { required: true, message: '请填写邮箱' },
        {
          validator: (value: any) => {
            if (value) {
              return valid.isValidEmail(value);
            }
            return true;
          },
          message: '请填写正确的邮箱'
        }
      ],
    },
    {
      label: "现居地址",
      key: "livingPlace",
      widget: "input",
      initialValue: formData?.livingPlace,
      span: "24",
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
        maxNumber: 1,
        showFileIcon: {
          showPreviewIcon: true,
          showRemoveIcon: true,
        },
      },
    },
  ]
}