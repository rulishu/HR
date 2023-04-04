import { KktproKeys } from '@kkt/pro';
interface FormListProps {
  type?: string,
  detailsData?: any;
}

export const ModalTitle: KktproKeys = {
  add: '新增组织机构',
  edit: '编辑组织机构',
  departmentAdd: '添加部门',
  departmentEdit: '编辑部门'
}

export const formList = ({
  type,
  detailsData,
}: FormListProps) => {
  const isDepartment = type ? ['departmentAdd', 'departmentEdit'].includes(type) : false
  const companyName = type === 'departmentEdit' ? detailsData?.company : detailsData?.companyName;
  return [
    {
      label: "公司名称",
      key: "companyName",
      widget: "input",
      required: true,
      initialValue: companyName,
      disabled: isDepartment,
      span: "24",
      readSpan: 1,
      rules: [
        { required: true, message: '请输入公司名称' },
      ],
    },
    {
      label: "公司地址",
      key: "companyAddress",
      widget: "textarea",
      initialValue: (detailsData as any)?.companyAddress,
      hide: isDepartment,
      span: "24",
      readSpan: 1,
    },
    {
      label: "部门名称",
      key: "departmentName",
      widget: "input",
      initialValue: (detailsData as any)?.departmentName,
      hide: !isDepartment,
      required:true,
      rules: [
        { required: true, message: '请输入部门名称' },
      ],
      span: "24",
      readSpan: 1,
    },
    {
      label: "备注",
      key: "departmentDesc",
      widget: "textarea",
      initialValue: (detailsData as any)?.departmentDesc,
      hide: !isDepartment,
      span: "24",
      readSpan: 1,
    }
  ]
}