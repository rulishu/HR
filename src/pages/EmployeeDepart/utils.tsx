
export const formData = (
  formData: any
) => {

  return [
    {
      label: "姓名",
      key: "name",
      widget: "input",
      initialValue: formData?.name,
      span: "24",
      rules: [
        { required: true, message: '请输入姓名' },
      ],
    },
    {
      label: "入职时间",
      key: "dateStart",
      widget: "dateInput",
      initialValue: '',
      span: "24",
      rules: [
        { required: true, message: '请输入' },
      ],
      widgetProps: {
        format: 'YYYY-MM-DD'
      },
    },
    {
      label: "离职时间",
      key: "dateEnd",
      widget: "dateInput",
      initialValue: '',
      span: "24",
      widgetProps: {
        format: 'YYYY-MM-DD'
      },
      required: true,
      rules: [
        { required: true, message: '请输入' },
      ],
    },
    {
      label: "所属岗位",
      key: "try",
      widget: "select",
      required: true,
      initialValue: '',
      span: "24",
      option: [
        { value: 10, label: '3个月' },
        { value: 20, label: '6个月' },
      ],
    },
    {
      label: "交接人员",
      key: "understanding",
      widget: "input",
      initialValue: formData?.name,
      span: "24",
      required: true,
      rules: [
        { required: true, message: '请输入' },
      ],
    },
    {
      label: "劳动合同开始时间",
      key: "memberStart",
      widget: "dateInput",
      initialValue: '',
      span: "24",
      widgetProps: {
        format: 'YYYY-MM-DD'
      },
      required: true,
      rules: [
        { required: true, message: '请输入' },
      ],
    },
    {
      label: "劳动合同结束时间",
      key: "memberEnd",
      widget: "dateInput",
      initialValue: '',
      span: "24",
      widgetProps: {
        format: 'YYYY-MM-DD'
      },
      required: true,
      rules: [
        { required: true, message: '请输入' },
      ],
    },
    {
      label: "离职原因",
      key: "summary",
      widget: "textarea",
      initialValue: formData?.name,
      span: "24",
      required: true,
      rules: [
        { required: true, message: '请输入' },
      ],
    },
    {
      label: "所属交接事项",
      key: "company",
      widget: "textarea",
      initialValue: formData?.name,
      span: "24",
      rules: [
        { required: true, message: '请输入' },
      ],
    },
  ]
} 