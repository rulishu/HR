import { KktproKeys } from '@kkt/pro';
interface FormListProps {
  type?: string,
  detailsData?: any;
  dictDetailsData?: any;
}

export const ModalTitle: KktproKeys = {
  add: '新增字典',
  edit: '编辑字典'
}

export const ModalDictTitle: KktproKeys = {
  add: '新增字典项',
  edit: '编辑字典项'
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
      key: "dictType",
      widget: "input",
      initialValue: (detailsData as any)?.dictType,
      required:true,
      rules: [
        { required: true, message: '请输入字典类别编号' },
      ],
      span: "12",
      readSpan: 1,
    },
    {
      label: "是否启用",
      key: "status",
      widget: "radio",
      initialValue: (detailsData as any)?.status,
      hide: type === 'add',
      option: [
        { label: '正常', value: '0' },
        { label: '停用', value: '1' }
      ],
      span: "12",
      readSpan: 1,
    }
  ]
}

export const dictFormList = ({ type, dictDetailsData }: FormListProps) => {
  return [
    {
      label: "字典项名称",
      key: "dictLabel",
      widget: "input",
      required: true,
      initialValue: (dictDetailsData as any)?.dictLabel,
      span: "24",
      readSpan: 1,
      rules: [
        { required: true, message: '请输入字典项名称' },
      ],
    },
    {
      label: "字典项值",
      key: "dictValue",
      widget: "input",
      initialValue: (dictDetailsData as any)?.dictValue,
      required:true,
      rules: [
        { required: true, message: '请输入字典项值' },
      ],
      span: "24",
      readSpan: 1,
    },
    {
      label: "是否启用",
      key: "status",
      widget: "radio",
      initialValue: (dictDetailsData as any)?.status,
      hide: type === 'add',
      option: [
        { label: '正常', value: '0' },
        { label: '停用', value: '1' }
      ],
      span: "12",
      readSpan: 1,
    }
  ]
}