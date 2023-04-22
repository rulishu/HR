import { KktproKeys } from '@kkt/pro';
import { Checkbox, Button, Tag } from "uiw";

interface columnsProps {
  onEdit?: (rowData: KktproKeys, type?: number) => void;
  onDelete?: (rowData: KktproKeys) => void;
}

export const columns = ({
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
              // onCheck?.(rowData, e);
            }}
          />
        );
      },
    },
    {
      title: "姓名",
      key: "staffName",
    },
    {
      title: "公司",
      key: "companyName",
    },
    {
      title: "职位",
      key: "post",
    },
    {
      title: "联系方式",
      key: "phone",
    },
    {
      title: "外派公司",
      key: "entryDate",
    },
    {
      title: "入场时间",
      key: "entranceTime",
    },
    {
      title: "离场时间",
      key: "departureTime",
    },
    {
      title: "工作地址",
      key: "workAddress",
    },
    {
      title: "办公方式",
      key: "workWay",
    },
    
    
    {
      title: "外派状态",
      key: "state",
      render: (text: any) => {
        return (
          <>
            {text === 3 ? <Tag light color="#28a745">入场</Tag> : ''}
          </>
        )
      }
    },
    {
      title: "备注",
      key: "remake",
    },
    {
      title: "操作",
      key: "edit",
      width: 110,
      render: (text: any, key: any, rowData: any) => {
        return (
          <>
            {rowData?.state === 3 ?
              <Button type="primary" onClick={() => onEdit?.(rowData, 3)} >离场</Button> :
              <Button type="primary" onClick={() => onEdit?.(rowData, 1)} >入场</Button>}
            <Button
              type="primary"
              onClick={() => {
                onEdit?.(rowData);
              }}
            >
              查看
            </Button>
          </>
        );
      },
    },
  ]