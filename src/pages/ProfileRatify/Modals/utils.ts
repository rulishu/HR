interface okColumnsProps {
  companyList?: any[];
  departmentList?: any[],
  data?: any;
}

export const okColumns = ({
  companyList = [],
  departmentList = [],
  data
}: okColumnsProps) => [
  {
    label: "入职公司",
    key: "company",
    widget: "select",
    span: 24,
    // option: companyList.map(item => ({ label: item.companyName, value: item.id })),
    option: companyList.filter((item) => item.companyType === 1).map(item => ({ label: item.companyName, value: item.id })),
    rules: [
      { required: true, message: '请选择入职公司' },
    ],
    initialValue: data?.company,
  },
  {
    label: "入职部门",
    key: "department",
    widget: "select",
    option: departmentList,
    span: 24,
    // rules: [
    //   { required: true, message: '请选择入职部门' },
    // ],
    initialValue: data?.department,
  },
  {
    label: "评价",
    key: "desc",
    widget: "textarea",
    span: "24",
    readSpan: 1,
    widgetProps: {
      rows: 5
    },
    initialValue: data?.desc,
  },
]