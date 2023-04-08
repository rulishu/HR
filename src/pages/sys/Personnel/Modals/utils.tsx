import { KktproKeys } from '@kkt/pro';
interface FormListProps {
  dataList?: any;
}

export const formList = ({
  dataList,
}: FormListProps) => {
  return [
    {
      label: "公司名称",
      key: "companyName",
      widget: "select",
      span: "24",
      option: dataList.map((item: KktproKeys) => ({ label: item.companyName, value: item.companyName })),
      rules: [
        { required: true, message: '请选择公司名称' },
      ],
    },
    {
      label: "部门",
      key: "departmentId",
      widget: "select",
      span: "24",
      option: [
        { value: 1, label: "入场" },
        { value: 2, label: "离场" },
      ],
      rules: [
        { required: true, message: '请选择派遣方式' },
      ],
    },
    {
      label: "项目组名称",
      key: "groupId",
      widget: "select",
      span: "24",
      option: [
        { value: 1, label: "入场" },
        { value: 2, label: "离场" },
      ],
      rules: [
        { required: true, message: '请选择派遣方式' },
      ],
    },
    {
      label: "派遣方式",
      key: "flag",
      widget: "select",
      span: "24",
      option: [
        { value: 1, label: "入场" },
        { value: 2, label: "离场" },
      ],
      rules: [
        { required: true, message: '请选择派遣方式' },
      ],
    },
  ]
}