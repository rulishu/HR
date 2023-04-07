import { KktproKeys } from '@kkt/pro';
import { Checkbox } from "uiw";

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
  },
  // {
  //   title: "年龄",
  //   key: "tip",
  // },
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
    title: "身份证号",
    key: "idNumber",
  },
  {
    title: "出生日期",
    key: "birth",
  },
  {
    title: "性别",
    key: "gender",
  },
  {
    title: "籍贯",
    key: "nativePlace",
  },
  {
    title: "婚姻状况",
    key: "isMarried",
  },
  {
    title: "现居地",
    key: "livingPlace",
  },
  {
    title: "政治面貌",
    key: "politicalStatus",
  },
  {
    title: "员工状态",
    key: "state",
  },
  // {
  //   title: "操作",
  //   key: "edit",
  //   width: 80,
  //   render: (text: any, key: any, rowData: any) => {
  //     return (
  //       <Button
  //         icon="edit"
  //         type="primary"
  //         onClick={(e) => {
  //           onEdit?.(rowData, e);
  //         }}
  //       >
  //         编辑
  //       </Button>
  //     );
  //   },
  // },
]