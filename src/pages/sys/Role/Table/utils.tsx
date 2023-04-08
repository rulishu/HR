import { KktproKeys } from '@kkt/pro';
import { TipButton } from "@/components";

interface columnsProps {
  onEdit?: (rowData: KktproKeys) => void;
  onRemove?: (rowData: KktproKeys) => void;
}

export const columns = ({
  onEdit,
  onRemove
}: columnsProps) => [
  {
    title: "角色名称",
    key: "name",
  },
  {
    title: "角色名",
    key: "desc",
  },
  {
    title: "创建时间",
    key: "createTime",
  },
  {
    title: "更新人",
    key: "updateName",
  },
  {
    title: "更新时间",
    key: "updateTime",
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
            onClick={() => onRemove?.(rowData)}
          />
        </>
      );
    },
  },
]