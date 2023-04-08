import { KktproKeys } from '@kkt/pro';
import { Button, Checkbox } from "uiw";

interface columnsProps {
  onCheck?: (rowData: KktproKeys, e: KktproKeys) => void;
  onEdit?: (rowData: KktproKeys) => void;
  onDelete?: (rowData: KktproKeys) => void;
}

export const columns = ({
  onCheck,
  onEdit,
  onDelete
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
  },
  {
    title: "入职时间",
    key: "tip",
  },
  {
    title: "离职时间",
    key: "tip",
  },
  {
    title: "所属岗位",
    key: "tip",
  },
  {
    title: "交接人员",
    key: "tip",
  },
  {
    title: "劳动合同开始时间",
    key: "tip",
  },
  {
    title: "劳动合同结束时间",
    key: "tip",
  },
  {
    title: "离职原因",
    key: "tip",
  },
  {
    title: "所属交接事项",
    key: "tip",
  },
  {
    title: "审批结果",
    key: "tip",
  },
  {
    title: "审批状态",
    key: "tip",
  },
  {
    title: "历史审批人",
    key: "tip",
  },
  {
    title: "创建人",
    key: "tip",
  },
  {
    title: "创建时间",
    key: "tip",
  },
  {
    title: "更新时间",
    key: "tip",
  },
  {
    title: "操作",
    key: "edit",
    width: 80,
    render: (text: any, key: any, rowData: any) => {
      return (
        <>
        <Button
          icon="edit"
          type="primary"
          onClick={() => {
            onEdit?.(rowData);
          }}
        >
          编辑
        </Button>
        <Button
        icon="edit"
        type="primary"
        onClick={() => {
          onDelete?.(rowData);
        }}
      >
        删除
      </Button>
      </>
      );
    },
  },
]