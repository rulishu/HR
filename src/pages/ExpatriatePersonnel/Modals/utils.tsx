interface FormListProps {
  queryInfo?:any;
  companyList?: any;
  handleChange?: (type:string,value: string) => void;
}

export const formList = ({
  queryInfo,
  companyList,
  handleChange
}: FormListProps) => {
  return [
    {
      label: "姓名",
      key: "staffName",
      widget: "input",
      initialValue: queryInfo?.staffName,
      disabled: true,
      span: "24",
    },
    {
      label: "外派公司",
      key: "companyId",
      widget: "searchSelect",
      span: "24",
      className: 'companyForm',
      option: companyList.filter((item: any) => item.companyType === 2).map((item: any) => ({ label: item.companyName, value: item.id })),
      hide: queryInfo?.state === 3,
      widgetProps: {
        showSearch: false,
        allowClear: true,
        labelInValue: true,
        onChange: (value: any) => {
          handleChange?.('companyId', value)
        }
      },
      rules: [
        { required: true, message: '请选择公司名称' },
      ],
    },
    {
      label: `${queryInfo?.state === 3 ? '离场' : '入场'}日期`,
      key: 'time',
      widget: 'dateInput',
      span: "24",
      widgetProps: {
        format: 'YYYY-MM-DD'
      },
      rules: [
        { required: true, message: '请选择入场日期' },
      ],
    },
    {
      label: "工作地址",
      key: "workAddress",
      widget: "input",
      span: "24",
      hide: queryInfo?.state === 3,
      rules: [
        { required: true, message: '请选择入场日期' },
      ],
    },
    {
      label: "办公方式",
      key: "workWay",
      widget: "input",
      span: "24",
      hide: queryInfo?.state === 3,
      rules: [
        { required: true, message: '请选择入场日期' },
      ],
    },
    {
      label: "备注",
      key: "remake",
      widget: "textarea",
      span: "24",
    },
  ]
}