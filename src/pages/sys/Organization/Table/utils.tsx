import { KktproKeys } from '@kkt/pro';
import { TipButton } from '@/components'

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
    title: "机构/部门",
    key: "companyName"
  },
  {
    title: "机构地址",
    key: "companyAddress",
  },
  {
    title: "领导人",
    key: "leader",
  },
  {
    title: "联系电话",
    key: "companyPhone",
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
          {rowData.type === 'company' && (
            <TipButton
              tip="添加部门"
              type="success"
              icon="plus"
              onClick={() => onAddDepartment?.(rowData)}
            />
          )}
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