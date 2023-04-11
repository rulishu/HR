import { KktproKeys } from '@kkt/pro';
import { TipButton } from '@/components';

interface columnsProps {
  onEdit?: (rowData: KktproKeys) => void;
  onDelete?: (rowData: KktproKeys) => void;
  onAddDepartment?: (rowData: KktproKeys) => void;
}

export const columns = ({
  onEdit,
  onDelete,
  onAddDepartment
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
              tip="添加项目"
              type="success"
              icon="plus"
              onClick={() => onAddDepartment?.(rowData)}
            />
          <TipButton
            tip="删除"
            icon="delete"
            type="danger"
            onClick={() => onDelete?.(rowData)}
          />
        </>
      );
    },
  },
]