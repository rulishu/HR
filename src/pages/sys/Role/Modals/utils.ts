export const formList = ({ type, detailsData}: { type?: string, detailsData?: any}) => [
  {
    label: "角色名称",
    key: "name",
    widget: "input",
    required: true,
    disabled: type === "add" ? false : true,
    initialValue: (detailsData as any)?.name,
    span: "12",
    readSpan: 1,
  },
  {
    label: "角色名",
    key: "desc",
    widget: "input",
    required: true,
    initialValue: (detailsData as any)?.desc,
    span: "12",
    readSpan: 1,
  },
]