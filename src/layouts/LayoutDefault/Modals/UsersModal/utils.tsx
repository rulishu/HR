import { KktproKeys } from "@kkt/pro";
import { Button } from "uiw";

interface FormListProps {
  type?: string,
  detailsData?: any;
  roleList?: any[];
  passIcon?: string;
  onLockPass?: () => void;
}

export const formList = ({
  type,
  detailsData,
  roleList = [],
  passIcon = 'lock',
  onLockPass
}: FormListProps) => [
  {
    label: "角色名称",
    key: "name",
    widget: "input",
    required: true,
    disabled: type === "add" ? false : true,
    initialValue: (detailsData as any)?.name,
    span: "12",
    readSpan: 1,
  },
  {
    label: (
      <span>
        密码
        <span style={{ color: "#858585", fontSize: 10 }}>
          （不填默认密码为：123456）
        </span>
      </span>
    ),
    key: "password",
    widget: "input",
    initialValue: detailsData?.password,
    type: passIcon === "lock" ? "password" : "text",
    widgetProps: {
      addonAfter: (
        <Button
          icon={passIcon as any}
          onClick={() => onLockPass?.()}
          size="small"
          basic
          type="light"
        />
      ),
    },
    span: "12",
    readSpan: 1,
  },
  {
    label: "选择部门",
    key: "roleId2",
    widget: "select",
    option: [],
    initialValue: detailsData?.roleId,
    required: true,
    rules: [{ required: true, message: "请选择选择部门" }],
    span: "12",
    widgetProps: {},
  },
  {
    label: "分配角色",
    key: "roleId",
    widget: "select",
    option: roleList.map((item: KktproKeys) => ({ label: item.name, value: item.id })),
    initialValue: detailsData?.roleId,
    required: true,
    rules: [{ required: true, message: "请选择需要分配的角色" }],
    span: "12",
    widgetProps: {},
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
    key: "enable",
    readSpan: 1,
    span: "24",
    hide: type === "add" ? true : false,
    initialValue: (typeof detailsData?.enable === "boolean"
      ? detailsData?.enable
      : ""
    ).toString(),
    option: [
      { label: "正常", value: "true" },
      { label: "禁用", value: "false" },
    ],
  },
]