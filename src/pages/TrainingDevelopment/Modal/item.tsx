export const formDataList = (
  formData: any,
  companyNameList: any[]
) => {
  return [
    {
      label: '选择对应的公司',
      key: 'companyId',
      widget: 'select',
      option: companyNameList,
      initialValue: formData.companyId,
      widgetProps: {},
      rules: [
        { required: true, message: '请输入' },
      ]
    },
    {
      label: '公告标题',
      key: 'title',
      widget: 'input',
      initialValue: formData?.title,
      widgetProps: {},
      help: "公告标题不能为空",
      rules: [
        { required: true, message: '请输入' },
      ]
    },
    {
      label: '公告内容',
      key: 'context',
      widget: 'textarea',
      initialValue: formData?.context,
      span: "24",
      readSpan: 2,
      widgetProps: {
        style: { minHeight: "200px" },
      },
    },
  ]
}
