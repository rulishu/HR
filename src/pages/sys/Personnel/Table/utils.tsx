import { KktproKeys } from '@kkt/pro';
import { TipButton } from '@/components';

interface columnsProps {
  onEdit?: (rowData: KktproKeys) => void;
  onDelete?: (rowData: KktproKeys) => void;
}

export const columns = ({
  onEdit,
  onDelete
}: columnsProps) => [
  {
    title: "姓名",
    key: "name",
  },
  {
    title: "部门",
    key: "department",
  },
  {
    title: "职位",
    key: "post",
  },
  {
    title: "手机号",
    key: "phone",
  },
  {
    title: "邮箱",
    key: "email",
  },
  {
    title: "入职日期",
    key: "entryDate",
  },
  {
    title: "员工状态",
    key: "state",
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
            onClick={() => onDelete?.(rowData)}
          />
        </>
      );
    },
  },
]