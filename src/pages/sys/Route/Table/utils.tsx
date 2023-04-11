import { KktproKeys } from '@kkt/pro';
import { TipButton } from "@/components";

interface columnsProps {
  onEdit?: (rowData: KktproKeys) => void;
  onRemove?: (rowData: KktproKeys) => void;
  onAdd?: (rowData: KktproKeys) => void;
}

export const columns = ({
  onEdit,
  onRemove,
  onAdd
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
    title: "排序",
    key: "orderNum",
    width: 80,
    render: (text: any) => {
      return <>{text || '0'}</>
    }
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
          {rowData.query === '1' && (
            <TipButton
              tip="新增菜单"
              type="success"
              icon="plus"
              onClick={() => onAdd?.(rowData)}
            />
          )}
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