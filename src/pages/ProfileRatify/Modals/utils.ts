interface okColumnsProps {
  companyList?: any[];
  departmentList?: any[]
}

export const okColumns = ({
  companyList = [],
  departmentList = []
}: okColumnsProps) => [
  {
    label: "入职公司",
    key: "company",
    widget: "select",
    span: 24,
    option: companyList.map(item => ({ label: item.companyName, value: item.id })),
    rules: [
      { required: true, message: '请选择入职公司' },
    ]
  },
  {
    label: "入职部门",
    key: "department",
    widget: "select",
    option: departmentList,
    span: 24,
    rules: [
      { required: true, message: '请选择入职部门' },
    ],
  },
]