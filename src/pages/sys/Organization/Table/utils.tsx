import { KktproKeys } from '@kkt/pro';
import { Button, Checkbox } from "uiw";

interface columnsProps {
  onEdit?: (rowData: KktproKeys) => void;
  onDelete?: (rowData: KktproKeys) => void;
}

export const columns = ({
  onEdit,
  onDelete
}: columnsProps) => [
  {
    title: "机构/部门",
    key: "companyName"
  },
  {
    title: "机构地址",
    key: "companyAddress",
  },
  {
    title: "操作",
    key: "edit",
    width: 220,
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
          {rowData.type === 'company' && (
            <Button
              icon="plus"
              type="success"
              onClick={() => onDelete?.(rowData)}
            >
              部门
            </Button>
          )}
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