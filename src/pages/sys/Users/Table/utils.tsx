import { KktproKeys } from '@kkt/pro';
import { Tag } from "uiw";
import { TipButton } from '@/components';

interface columnsProps {
  onEdit?: (rowData: KktproKeys) => void;
  onDelete?: (rowData: KktproKeys) => void;
  roleList: KktproKeys[]
}

const getLabel = (roleList: KktproKeys[], id: string) => {
  const obj = roleList.find(item => item.id === id) || {};
  return obj.name || '';
}

export const columns = ({
  onEdit,
  onDelete,
  roleList
}: columnsProps) => [
  {
    title: "用户名",
    key: "username",
  },
  {
    title: "昵称",
    key: "name",
  },
  {
    title: "角色",
    key: "roleIds",
    render: (text: any) => (
      <>{getLabel(roleList, text)}</>
    ),
  },
  {
    title: "禁用状态",
    key: "locked",
    with: 100,
    render: (text: any) => (
      <Tag
        title={text === '1' ? "正常" : "停用"}
        color={text === '1' ? "#28a745" : "#dc3545"}
      />
    ),
  },
  {
    title: "备注",
    key: "remark",
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