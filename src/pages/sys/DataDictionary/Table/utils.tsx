import { KktproKeys } from '@kkt/pro';
import { Tag } from 'uiw';
import { TipButton } from '@/components'

interface columnsProps {
  onEdit?: (rowData: KktproKeys) => void;
  onShow?: (rowData: KktproKeys) => void;
  onDelete?: (rowData: KktproKeys) => void;
}

export const columns = ({
  onEdit,
  onShow,
  onDelete
}: columnsProps) => [
  {
    title: "字典类别名称",
    key: "dictName"
  },
  {
    title: "字典类别编号",
    key: "dictType",
  },
  {
    title: "状态",
    key: "status",
    with: 100,
    render: (text: any) => (
      <Tag
        title={text === '0' ? "正常" : "停用"}
        color={text === '0' ? "#28a745" : "#dc3545"}
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
            tip="查看字典数据"
            type="success"
            icon="document"
            onClick={() => onShow?.(rowData)}
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

export const dictColumns = ({
  onEdit,
  onDelete
}: columnsProps) => [
  {
    title: "字典项名称",
    key: "dictLabel"
  },
  {
    title: "字典项值",
    key: "dictValue",
  },
  {
    title: "状态",
    key: "status",
    with: 100,
    render: (text: any) => (
      <Tag
        title={text === '0' ? "正常" : "停用"}
        color={text === '0' ? "#28a745" : "#dc3545"}
      />
    ),
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