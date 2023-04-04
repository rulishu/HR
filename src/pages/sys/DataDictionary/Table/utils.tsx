import { KktproKeys } from '@kkt/pro';
import { Tag } from 'uiw';
import { TipButton } from '@/components'

interface columnsProps {
  onEdit?: (rowData: KktproKeys) => void;
  onDelete?: (rowData: KktproKeys) => void;
}

export const columns = ({
  onEdit,
  onDelete
}: columnsProps) => [
  {
    title: "字典类别名称",
    key: "dictName"
  },
  {
    title: "字典类别编号",
    key: "firstCode",
  },
  {
    title: "状态",
    key: "enable",
    with: 100,
    render: (text: any) => (
      <Tag
        title={text === 1 ? "正常" : "停用"}
        color={text === 1 ? "#28a745" : "#dc3545"}
      />
    ),
  },
  {
    title: "操作",
    key: "edit",
    width: 140,
    render: (text: any, key: any, rowData: any) => {
      return (
        <>
          <TipButton
            tip="编辑"
            icon="edit"
            type="primary"
            onClick={() => onEdit?.(rowData)}
          />
          <TipButton
            tip="新增字典项"
            type="success"
            icon="plus"
            onClick={() => onEdit?.(rowData)}
          />
          <TipButton
            tip="删除"
            type="danger"
            icon="delete"
            onClick={() => onDelete?.(rowData)}
          />
        </>
      );
    },
  },
]

export const dictColumns = () => [
  {
    title: "字典项名称",
    key: "dictName"
  },
  {
    title: "字典项Code",
    key: "firstCode",
  },
  {
    title: "操作",
    key: "edit",
    width: 100,
    render: (text: any, key: any, rowData: any) => {
      return (
        <>
          <TipButton
            tip="编辑"
            icon="edit"
            type="primary"
          />
          <TipButton
            tip="删除"
            type="danger"
            icon="delete"
          />
        </>
      );
    },
  },
]