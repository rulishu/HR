import { KktproKeys } from '@kkt/pro';
interface FormListProps {
  queryInfo?:any;
  dataList?: any;
  companyList?: any;
  handleChange?: (type:string,value: string) => void;
}

export const formList = ({
  queryInfo,
  dataList,
  companyList,
  handleChange
}: FormListProps) => {
  return [
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
          handleChange?.('companyId', value)
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
    },
    {
      label: "项目组名称",
      key: "groupId",
      widget: "select",
      // disabled: true,
      span: "24",
      option: dataList?.[0]?.projectGroups?.map((item: KktproKeys) => ({ label: item.groupName, value: item.id })),
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
      onChange: (e: any) => {
        handleChange?.('flag', e.target.value)
      },
      rules: [
        { required: true, message: '请选择派遣方式' },
      ],
    },
    {
      label: `${queryInfo?.flag === '2' ? '离场' : '入场'}日期`,
      key: 'time',
      widget: 'dateInput',
      span: "24",
      widgetProps: {
        format: 'YYYY-MM-DD'
      },
      rules: [
        { required: true, message: '请选择入场日期' },
      ],
    },
  ]
}