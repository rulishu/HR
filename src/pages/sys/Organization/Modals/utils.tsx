interface FormListProps {
  type?: string,
  detailsData?: any;
}

export const formList = ({
  type,
  detailsData,
}: FormListProps) => [
  {
    label: "公司名称",
    key: "companyName",
    widget: "input",
    required: true,
    initialValue: (detailsData as any)?.companyName,
    span: "24",
    readSpan: 1,
  },
  {
    label: "公司地址",
    key: "companyAddress",
    widget: "textarea",
    required: true,
    initialValue: (detailsData as any)?.companyAddress,
    span: "24",
    readSpan: 1,
  }
]