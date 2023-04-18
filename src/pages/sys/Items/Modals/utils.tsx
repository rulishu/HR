import { KktproKeys } from '@kkt/pro';
interface FormListProps {
  type?: string,
  detailsData?: any;
  companyList?: KktproKeys[]
}

export const ModalTitle: KktproKeys = {
  add: '新增项目组',
  edit: '编辑项目组',
  departmentAdd: '添加项目',
  departmentEdit: '编辑项目'
}

export const formList = ({
  type,
  detailsData,
  companyList = []
}: FormListProps) => {
  const isDepartment = type ? ['departmentAdd', 'departmentEdit'].includes(type) : false
  const groupName = type === 'departmentEdit' ? detailsData?.group : detailsData?.groupName;
  return [
    {
      label: "项目组名称",
      key: "groupName",
      widget: "input",
      required: true,
      disabled: isDepartment,
      initialValue: groupName,
      span: "24",
      readSpan: 1,
      rules: [
        { required: true, message: '请输入项目组名称' },
      ],
    },
    {
      label: "项目名称",
      key: "projectName",
      widget: "input",
      initialValue: (detailsData as any)?.projectName,
      hide: !isDepartment,
      required:true,
      rules: [
        { required: true, message: '请输入项目名称' },
      ],
      span: "24",
      readSpan: 1,
    },
    {
      label: "负责人",
      key: "manager",
      widget: "input",
      required: true,
      initialValue:  (detailsData as any)?.manager,
      hide: isDepartment,
      span: "24",
      readSpan: 1,
      rules: [
        { required: true, message: '请输入负责人' },
      ],
    },
    {
      label: "选择机构",
      key: "companyId",
      widget: "select",
      initialValue: (detailsData as any)?.companyId,
      option: companyList.map((item: KktproKeys) => ({ label: item.companyName, value: item.id })),
      hide: isDepartment,
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