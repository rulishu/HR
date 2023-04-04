import { KktproKeys } from '@kkt/pro';
interface FormListProps {
  type?: string,
  detailsData?: any;
}

export const ModalTitle: KktproKeys = {
  add: '新增字典',
  edit: '编辑字典'
}

export const formList = ({
  type,
  detailsData,
}: FormListProps) => {
  return [
    {
      label: "字典类别名称",
      key: "dictName",
      widget: "input",
      required: true,
      initialValue: (detailsData as any)?.dictName,
      span: "12",
      readSpan: 1,
      rules: [
        { required: true, message: '请输入字典类别名称' },
      ],
    },
    {
      label: "字典类别编号",
      key: "firstCode",
      widget: "input",
      initialValue: (detailsData as any)?.firstCode,
      required:true,
      rules: [
        { required: true, message: '请输入字典类别编号' },
      ],
      span: "12",
      readSpan: 1,
    },
    {
      label: "是否启用",
      key: "enable",
      widget: "radio",
      initialValue: (detailsData as any)?.enable,
      hide: type === 'add',
      option: [
        { label: '正常', value: 1 },
        { label: '停用', value: 0 }
      ],
      span: "12",
      readSpan: 1,
    }
  ]
}