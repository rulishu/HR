import { KktproKeys } from "@kkt/pro";

interface FormListProps {
  type?: string,
  detailsData?: any;
  // roleList?: any[];
  passIcon?: string;
  formObj?: KktproKeys;
  onLockPass?: () => void;
}

export const formList = ({
  type,
  detailsData,
  // roleList = [],
  passIcon = 'lock',
  formObj,
  onLockPass
}: FormListProps) => [
  {
    label: "姓名",
    key: "username",
    widget: "input",
    required: true,
    disabled: type === "add" ? false : true,
    initialValue: (detailsData as any)?.username,
    // span: "12",
    readSpan: 1,
  },
  {
    label: '部门',
    key: 'select1',
    widget: 'select',
    option: [
      { value: 10, label: "研发部" },
      { value: 20, label: "人事部" },
    ],
  },
  {
    label: '职位',
    key: 'select2',
    widget: 'select',
    option: [
      { value: 10, label: "研发" },
      { value: 20, label: "人事" },
    ],
  },
  {
    label: "手机号码",
    key: "phone",
    widget: "input",
    required: true,
    disabled: type === "add" ? false : true,
    initialValue: (detailsData as any)?.username,
    // span: "12",
    readSpan: 1,
  },
  {
    label: "邮箱",
    key: "email",
    widget: "input",
    required: true,
    disabled: type === "add" ? false : true,
    initialValue: (detailsData as any)?.username,
    // span: "12",
    readSpan: 1,
  },
  {
    label: '入职时间',
    key: 'dateInput',
    widget: 'dateInput',
    widgetProps: {
      format: 'YYYY-MM-DD'
    },
  },
]