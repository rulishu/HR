import { KktproKeys } from '@kkt/pro';
import { Button } from "uiw";

interface columnsProps {
  onEdit?: (rowData: KktproKeys, e: KktproKeys) => void;
  onRemove?: (rowData: KktproKeys, e: KktproKeys) => void;
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
    width: 160,
    render: (text: any, key: any, rowData: any) => {
      return (
        <>
          <Button
            icon="edit"
            type="primary"
            onClick={(e) => {
              onEdit?.(rowData, e);
            }}
          >
            编辑
          </Button>
          <Button
            icon="delete"
            type="danger"
            onClick={(e) => {
              onRemove?.(rowData, e);
            }}
          >
            删除
          </Button>
        </>
      );
    },
  },
]