import { KktproKeys } from '@kkt/pro';
import { Button } from "uiw";

interface columnsProps {
  onEdit?: (rowData: KktproKeys) => void;
  onRemove?: (rowData: KktproKeys) => void;
}

export const columns = ({
  onEdit,
  onRemove
}: columnsProps) => [
  {
    title: "角色名称",
    key: "name",
  },
  {
    title: "备注",
    key: "desc",
  },
  {
    title: "创建时间",
    key: "createTime",
  },
  {
    title: "更新人",
    key: "updateName",
  },
  {
    title: "更新时间",
    key: "updateTime",
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
            onClick={() => onEdit?.(rowData)}
          >
            编辑
          </Button>
          <Button
            icon="delete"
            type="danger"
            onClick={() => onRemove?.(rowData)}
          >
            删除
          </Button>
        </>
      );
    },
  },
]