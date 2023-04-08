import { KktproKeys } from '@kkt/pro';
interface FormListProps {
  dataList?: any;
  companyList?: any;
  onCompanyChange?: (value: string) => void;
}

export const formList = ({
  dataList,
  companyList,
  onCompanyChange
}: FormListProps) => {
  return [
    // {
    //   label: "公司名称",
    //   key: "companyName",
    //   widget: "select",
    //   span: "24",
    //   option: companyList.map((item: KktproKeys) => ({ label: item.companyName, value: item.companyName })),
    //   widgetProps: {
    //     labelInValue: true,
    //     onChange: (e: any) => {
    //       onCompanyChange?.(e.target.value)
    //     }
    //   },
    //   rules: [
    //     { required: true, message: '请选择公司名称' },
    //   ],
    // },
    {
      label: "公司名称",
      key: "companyId",
      widget: "searchSelect",
      span: "24",
      option: companyList.map((item: KktproKeys) => ({ label: item.companyName, value: item.id })),
      widgetProps: {
        showSearch: false,
        allowClear: true,
        labelInValue: true,
        onChange: (value: any) => {
          onCompanyChange?.(value)
        }
      },
      rules: [
        { required: true, message: '请选择公司名称' },
      ],
    },
    {
      label: "部门",
      key: "departmentId",
      widget: "select",
      // disabled: true,
      span: "24",
      option: dataList?.[0]?.department?.map((item: KktproKeys) => ({ label: item.departmentName, value: item.id })),
      rules: [
        { required: true, message: '请选择派遣方式' },
      ],
    },
    {
      label: "项目组名称",
      key: "groupId",
      widget: "select",
      // disabled: true,
      span: "24",
      option: dataList?.[0]?.projectGroups?.map((item: KktproKeys) => ({ label: item.groupName, value: item.id })),
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