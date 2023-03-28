import { KktproKeys } from '@kkt/pro';
import { Button, Checkbox } from "uiw";

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
    key: "code",
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
    title: "上班考勤",
    key: "tip",
  },
  {
    title: "下班考勤",
    key: "tip",
  },
  {
    title: "职位",
    key: "tip",
  }
]