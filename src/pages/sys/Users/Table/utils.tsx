import { KktproKeys } from '@kkt/pro';
import { Button, Tag } from "uiw";

interface columnsProps {
  onEdit?: (rowData: KktproKeys) => void;
  onDelete?: (rowData: KktproKeys) => void;
}

export const columns = ({
  onEdit,
  onDelete,
}: columnsProps) => [
  {
    title: "用户名",
    key: "username",
  },
  {
    title: "昵称",
    key: "name",
  },
  {
    title: "禁用状态",
    key: "locked",
    with: 100,
    render: (text: any) => (
      <Tag
        title={text === 1 ? "正常" : "停用"}
        color={text === 1 ? "#28a745" : "#dc3545"}
      />
    ),
  },
  {
    title: "备注",
    key: "remark",
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
            onClick={() => onDelete?.(rowData)}
          >
            删除
          </Button>
        </>
      );
    },
  },
]