import { KktproKeys } from '@kkt/pro';
import { Button, Checkbox, Tag } from "uiw";

interface columnsProps {
  onCheck?: (rowData: KktproKeys, e: KktproKeys) => void;
  onRole?: (data: KktproKeys) => void;
  onEdit?: (rowData: KktproKeys, e: KktproKeys) => void;
}

export const columns = ({
  onCheck,
  onRole,
  onEdit
}: columnsProps) => [
  {
    key: "checked",
    render: (text: any, key: any, rowData: any) => {
      return (
        <Checkbox
          checked={rowData.checked}
          onClick={(e) => {
            onCheck?.(rowData, e);
          }}
        />
      );
    },
  },
  {
    title: "姓名",
    key: "name",
    render: (text: any, key: any, rowData: any) => (
      <Button
        type="link"
        onClick={() => {
          onRole?.(rowData);
        }}
      >
        {text}
      </Button>
    ),
  },
  {
    title: "部门",
    key: "tip",
  },
  {
    title: "职位",
    key: "tip",
  },
  {
    title: "上班时间",
    key: "tip",
  },
  {
    title: "下班时间",
    key: "tip",
  },
  {
    title: "出勤时长",
    key: "tip",
  },
  {
    title: "状态",
    key: "status",
    render: (_text: any, _key: any, rowData: { status: number; }) => (
      <div>
        {rowData.status === 1 ? (
          <Tag title="正常" color="#28a745" />
        ) : (
          <Tag title="迟到" color="#ffc107" />
        )}
      </div>
      // <div style={{ textAlign: 'center' }}>
      //   <Tag color={rowData.status === 1 ? '#28a745' : '#dc3545'}>{status[rowData.status as keyof typeof status]}</Tag>
      // </div>
    ),
  }
]