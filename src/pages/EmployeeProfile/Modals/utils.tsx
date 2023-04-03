import { KktproKeys } from "@kkt/pro";

interface FormListProps {
  type?: string,
  detailsData?: any;
  roleList?: any[];
  passIcon?: string;
  formObj?: KktproKeys;
  onLockPass?: () => void;
}

export const formList = ({
  type,
  detailsData,
  roleList = [],
  passIcon = 'lock',
  formObj,
  onLockPass
}: FormListProps) => [
  {
    label: "账号名称",
    key: "username",
    widget: "input",
    required: true,
    disabled: type === "add" ? false : true,
    initialValue: (detailsData as any)?.username,
    span: "12",
    readSpan: 1,
  },
  {
    label: "备注",
    key: "remark",
    widget: "textarea",
    readSpan: 1,
    span: "24",
    initialValue: detailsData?.remark,
  },
  {
    label: "是否禁用",
    widget: "radio",
    key: "locked",
    readSpan: 1,
    span: "24",
    hide: type === "add" ? true : false,
    initialValue: (!!detailsData?.locked).toString(),
    option: [
      { label: "正常", value: "true" },
      { label: "禁用", value: "false" },
    ],
  },
]