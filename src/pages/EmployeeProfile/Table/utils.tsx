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
    title: "年龄",
    key: "tip",
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
    title: "手机号",
    key: "tip",
  },
  {
    title: "邮箱",
    key: "tip",
  },
  {
    title: "入职时间",
    key: "tip",
  },
  {
    title: "证件类型",
    key: "tip",
  },
  {
    title: "证件号码",
    key: "tip",
  },
  {
    title: "身份证地址",
    key: "tip",
  },
  {
    title: "婚姻状况",
    key: "tip",
  },
  {
    title: "员工类型",
    key: "tip",
  },
  {
    title: "员工状态",
    key: "tip",
  },
  {
    title: "学历",
    key: "tip",
  },
  
  
  {
    title: "操作",
    key: "edit",
    width: 80,
    render: (text: any, key: any, rowData: any) => {
      return (
        <Button
          icon="edit"
          type="primary"
          onClick={(e) => {
            onEdit?.(rowData, e);
          }}
        >
          编辑
        </Button>
      );
    },
  },
]