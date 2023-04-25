import { valid } from '@/utils/valid';
import { downloadPdfFile } from '@/utils/export';
import pdf from "@/assets/pdf.png";
export const formList = (
  formData: any,
  handleChange: () => void,
  dictObject: any,
  editType: any,
  file: any
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
      label: "籍贯",
      key: "nativePlace",
      widget: "input",
      initialValue: formData?.nativePlace,
      span: "24",
      rules: [
        { message: '请填写籍贯' },
        {
          validator: (value: any) => {
            if (value) {
              return valid.isNativePlace(value);
            }
            return true;
          },
          message: '请填写汉字'
        }
      ],
      hide: editType === 'edit' ? false : true
    },
    {
      label: "民族",
      key: "nationality",
      widget: "input",
      initialValue: formData?.nationality,
      span: "24",
      rules: [
        { message: '请填写民族' },
        {
          validator: (value: any) => {
            if (value) {
              return valid.isNativePlace(value);
            }
            return true;
          },
          message: '请填写汉字'
        }
      ],
      hide: editType === 'edit' ? false : true
    },
    {
      label: "婚姻状况",
      key: "isMarried",
      widget: "select",
      option: dictObject['married']?.child || [],
      initialValue: formData?.isMarried,
      span: "24",
      rules: [
        { message: '请选择入婚姻状况' },
      ],
      hide: editType === 'edit' ? false : true
    },
    {
      label: "自我介绍",
      key: "introduce",
      widget: "textarea",
      initialValue: formData?.introduce,
      span: "24",
      hide: editType === 'edit' ? false : true
    },
    {
      label: "期望薪资",
      key: "salaryExpectation",
      widget: "input",
      initialValue: formData?.salaryExpectation,
      span: "24",
      hide: editType === 'edit' ? false : true
    },

    {
      label: '上传简历',
      key: 'upload',
      widget: 'upload',
      initialValue: formData?.cvFileUUID && [{ dataURL: pdf, name: `${formData?.name}的简历` }],
      span: '24',
      readSpan: 3,
      widgetProps: {
        onChange: handleChange,
        uploadType: 'picture',
        maxNumber: 1,
        onPreview: () => downloadPdfFile(file),
        showFileIcon: {
          showPreviewIcon: true,
          showRemoveIcon: true,
        },
      },
    },
  ]
}

export const form2List = (
  formData: any
) => {
  return [
    {
      label: "项目经验",
      key: "projectExperience",
      widget: "textarea",
      initialValue: formData?.projectExperience,
      widgetProps: {
        rows: 5
      },
      span: "24",
      rules: [
        { message: '请输入姓名' },
      ],
    },
  ]
}