import { KktproKeys } from '@kkt/pro';
import { TipButton } from "@/components";

interface columnsProps {
  onEdit?: (rowData: KktproKeys) => void;
  onRemove?: (rowData: KktproKeys) => void;
}

export const columns = ({
  onEdit,
  onRemove
}: columnsProps) => [
  {
    title: "路由名称",
    key: "menuName",
  },
  {
    title: "路由地址",
    key: "path",
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
            icon="delete"
            type="danger"
            onClick={() => onRemove?.(rowData)}
          />
        </>
      );
    },
  },
]