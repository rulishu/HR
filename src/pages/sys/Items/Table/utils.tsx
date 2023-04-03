import { KktproKeys } from '@kkt/pro';
import { Button } from "uiw";

interface columnsProps {
  onEdit?: (rowData: KktproKeys) => void;
  onDelete?: (rowData: KktproKeys) => void;
}

export const columns = ({
  onEdit,
  onDelete
}: columnsProps) => [
  {
    title: "项目组名称",
    key: "groupName"
  },
  {
    title: "机构名称",
    key: "companyName",
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
            onClick={(e) => onEdit?.(rowData)}
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