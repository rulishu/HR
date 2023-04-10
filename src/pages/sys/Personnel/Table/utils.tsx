import { Tag } from "uiw";
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
    key: "staffName",
  },
  {
    title: "部门",
    key: "departmentName",
  },
  {
    title: "职位",
    key: "groupProjectName",
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
    key: "type",
    render: (text: any) => (
      <Tag
        title={text === '1' ? "在职" : "离职"}
        color={text === '1' ? "#28a745" : "#dc3545"}
      />
    ),
  },
  {
    title: "操作",
    key: "edit",
    width: 100,
    render: (text: any, key: any, rowData: any) => {
      return (
          <TipButton
            tip="编辑"
            icon="edit"
            type="primary"
            onClick={() => onEdit?.(rowData)}
          />
      );
    },
  },
]