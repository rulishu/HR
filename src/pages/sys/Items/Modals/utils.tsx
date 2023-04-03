import { KktproKeys } from '@kkt/pro';
interface FormListProps {
  type?: string,
  detailsData?: any;
  companyList?: KktproKeys[]
}

export const ModalTitle: KktproKeys = {
  add: '新增项目组',
  edit: '编辑项目组',
}

export const formList = ({
  type,
  detailsData,
  companyList = []
}: FormListProps) => {
  return [
    {
      label: "项目组名称",
      key: "groupName",
      widget: "input",
      required: true,
      initialValue: (detailsData as any)?.groupName,
      span: "24",
      readSpan: 1,
      rules: [
        { required: true, message: '请输入项目组名称' },
      ],
    },
    {
      label: "选择机构",
      key: "companyId",
      widget: "select",
      initialValue: (detailsData as any)?.companyId,
      option: companyList.map((item: KktproKeys) => ({ label: item.companyName, value: item.id })),
      span: "24",
      readSpan: 1,
      required: true,
      rules: [
        { required: true, message: '请选择机构' },
      ],
    },
    {
      label: "备注",
      key: "remark",
      widget: "textarea",
      initialValue: (detailsData as any)?.remark,
      span: "24",
      readSpan: 1,
    },
  ]
}