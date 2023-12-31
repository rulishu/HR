interface FormListProps {
  queryInfo?: any;
  companyList?: any;
  handleChange?: (type: string, value: string) => void;
  buttonType?: any
}

export const formList = ({ queryInfo, companyList, handleChange, buttonType }: FormListProps) => {
  return [
    {
      label: '姓名',
      key: 'staffName',
      widget: 'input',
      initialValue: queryInfo?.staffName,
      disabled: true,
      span: '24',
    },
    {
      label: '外派公司',
      key: 'companyId',
      widget: 'searchSelect',
      span: '24',
      className: 'companyForm',
      option: companyList
        .filter((item: any) => item.companyType === 2)
        .map((item: any) => ({ label: item.companyName, value: item.id })),
      hide: queryInfo?.state === 3,
      widgetProps: {
        showSearch: false,
        allowClear: true,
        labelInValue: true,
        onChange: (value: any) => {
          handleChange?.('companyId', value);
        },
      },
      initialValue: buttonType === 555 ? [{ label: queryInfo?.expatriateCompanyName, value: queryInfo?.companyId }] : [],
      rules: [{ required: buttonType === 555 ? false : true, message: '请选择外派公司名称' }],
    },
    {
      label: `${queryInfo?.state === 3 ? '离场' : '入场'}日期`,
      key: 'time',
      widget: 'dateInput',
      span: '24',
      widgetProps: {
        format: 'YYYY-MM-DD',
      },
      hide: buttonType === 555,
      rules: [{ required: buttonType === 555 ? false : true, message: `请选择${queryInfo?.state === 3 ? '离场' : '入场'}日期` }],
    },
    {
      label: '工作地址',
      key: 'workAddress',
      widget: 'input',
      span: '24',
      hide: queryInfo?.state === 3,
      initialValue: buttonType === 555 ? queryInfo?.workAddress : '',
      rules: [{ required: buttonType === 555 ? false : true, message: '请输入工作地址' }],
    },
    {
      label: '办公方式',
      key: 'workWay',
      widget: 'input',
      span: '24',
      hide: queryInfo?.state === 3,
      initialValue: buttonType === 555 ? queryInfo?.workWay : '',
      rules: [{ required: buttonType === 555 ? false : true, message: '请输入办公方式' }],
    },
    {
      label: '级别',
      key: 'qualifications',
      widget: 'input',
      span: '24',
      hide: queryInfo?.state === 3,
      initialValue: buttonType === 555 ? queryInfo?.qualifications : '',
      rules: [{ required: buttonType === 555 ? false : true, message: '请输入级别' }],
    },
    {
      label: '备注',
      key: 'remake',
      widget: 'textarea',
      span: '24',
      initialValue: buttonType === 555 ? queryInfo?.remake : '',
    },
  ];
};
