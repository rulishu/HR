export const formDataList = (formData: any) => {
  return [
    {
      label: '公告标题',
      key: 'title',
      widget: 'input',
      initialValue: formData?.title,
      widgetProps: {},
      // help: "公告标题不能为空",
      rules: [
        { required: true, message: '请输入' },
      ]
    },
    {
      label: '公告内容',
      key: 'context',
      widget: 'textarea',
      initialValue: formData?.context,
      widgetProps: {},
    },
    {
      label: '创建时间',
      key: 'createTime',
      widget: 'dateInput',
      initialValue: formData?.createTime,
      widgetProps: {
        format: 'YYYY-MM-DD'
      },
    },
  ]
}
