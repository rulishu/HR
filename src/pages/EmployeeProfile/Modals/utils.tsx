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
    span: "12",
    readSpan: 1,
  },
  {
    label: '部门',
    key: 'select1',
    widget: 'select',
    span: "12",
    option: [
      { value: 10, label: "研发部" },
      { value: 20, label: "人事部" },
    ],
  },
  {
    label: '职位',
    key: 'select2',
    widget: 'select',
    span: "12",
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
    span: "12",
    readSpan: 1,
  },
  {
    label: "邮箱",
    key: "email",
    widget: "input",
    required: true,
    disabled: type === "add" ? false : true,
    initialValue: (detailsData as any)?.username,
    span: "12",
    readSpan: 1,
  },
  {
    label: '入职时间',
    key: 'dateInput',
    widget: 'dateInput',
    span: "12",
    widgetProps: {
      format: 'YYYY-MM-DD'
    },
  },
]

export const personalInformation = ({ type, detailsData}: { type?: string, detailsData?: any}) => [
  {
    label: '证件类型',
    key: 'select1',
    widget: 'select',
    span: "12",
    option: [
      { value: 10, label: "身份证" },
      { value: 20, label: "护照" },
      { value: 30, label: "军官证" },
      { value: 40, label: "台胞证" },
      { value: 50, label: "其他" },
    ],
  },
  {
    label: "证件号码",
    key: "name",
    widget: "input",
    required: true,
    disabled: type === "add" ? false : true,
    initialValue: (detailsData as any)?.name,
    span: "12",
    readSpan: 1,
  },
  {
    label: '出生日期',
    key: 'dateInput',
    widget: 'dateInput',
    span: "12",
    widgetProps: {
      format: 'YYYY-MM-DD'
    },
  },
  {
    label: '性别',
    key: 'select2',
    widget: 'select',
    span: "12",
    option: [
      { value: 10, label: "男" },
      { value: 20, label: "女" },
    ],
  },
  {
    label: "身份证地址",
    key: "desc",
    widget: "input",
    required: true,
    initialValue: (detailsData as any)?.desc,
    span: "12",
    readSpan: 1,
  },
  {
    label: '婚姻状况',
    key: 'select3',
    widget: 'select',
    span: "12",
    option: [
      { value: 10, label: "未婚" },
      { value: 20, label: "已婚" },
      { value: 30, label: "已婚已育" },
      { value: 40, label: "离异" },
    ],
  },
  {
    label: '户籍类型',
    key: 'select4',
    widget: 'select',
    span: "12",
    option: [
      { value: 10, label: "城镇" },
      { value: 20, label: "非城镇" },
    ],
  },
  {
    label: "住址",
    key: "desc1",
    widget: "input",
    required: true,
    initialValue: (detailsData as any)?.desc,
    span: "12",
    readSpan: 1,
  },
  {
    label: '政治面貌',
    key: 'select3',
    widget: 'select',
    span: "12",
    option: [
      { value: 10, label: "团员" },
      { value: 20, label: "党员" },
      { value: 30, label: "群众" },
      { value: 40, label: "其他" },
    ],
  },
  {
    label: "个人社保账号",
    key: "des1",
    widget: "input",
    required: true,
    initialValue: (detailsData as any)?.desc,
    span: "12",
    readSpan: 1,
  },
  {
    label: "个人公积金账号",
    key: "de1",
    widget: "input",
    required: true,
    initialValue: (detailsData as any)?.desc,
    span: "12",
    readSpan: 1,
  },
]
export const workInformation = ({ type, detailsData}: { type?: string, detailsData?: any}) => [
  {
    label: '员工类型',
    key: 'select1',
    widget: 'select',
    span: "12",
    option: [
      { value: 10, label: "全职" },
      { value: 20, label: "兼职" },
      { value: 30, label: "实习" },
      { value: 40, label: "劳务派遣" },
      { value: 50, label: "劳务外包" },
      { value: 50, label: "退休返聘" },
      { value: 50, label: "无类型" }
    ],
  },
  {
    label: '员工状态',
    key: 'select2',
    widget: 'select',
    span: "12",
    option: [
      { value: 10, label: "试用" },
      { value: 20, label: "正式" },
      { value: 30, label: "待离职" },
      { value: 40, label: "已离职" },
    ],
  },
  {
    label: "试用期（天）",
    key: "name",
    widget: "input",
    required: true,
    disabled: type === "add" ? false : true,
    initialValue: (detailsData as any)?.name,
    span: "12",
    readSpan: 1,
  },
  {
    label: '转正日期',
    key: 'dateInput',
    widget: 'dateInput',
    span: "12",
    widgetProps: {
      format: 'YYYY-MM-DD'
    },
  },
]
export const educationalInformation = ({ type, detailsData}: { type?: string, detailsData?: any}) => [
  {
    label: '最高学历',
    key: 'select1',
    widget: 'select',
    span: "12",
    option: [
      { value: 10, label: "本科" },
      { value: 20, label: "硕士" },
      { value: 30, label: "博士" },
      { value: 40, label: "专科" },
    ],
  },
  {
    label: "毕业院校",
    key: "name",
    widget: "input",
    required: true,
    disabled: type === "add" ? false : true,
    initialValue: (detailsData as any)?.name,
    span: "12",
    readSpan: 1,
  },
  {
    label: '毕业时间',
    key: 'dateInput',
    widget: 'dateInput',
    span: "12",
    widgetProps: {
      format: 'YYYY-MM-DD'
    },
  },
  {
    label: "所学专业",
    key: "name",
    widget: "input",
    required: true,
    disabled: type === "add" ? false : true,
    initialValue: (detailsData as any)?.name,
    span: "12",
    readSpan: 1,
  },
]
export const contractSituation = ({ type, detailsData}: { type?: string, detailsData?: any}) => [
  {
    label: '合同类型',
    key: 'select1',
    widget: 'select',
    span: "12",
    option: [
      { value: 10, label: "固定期限" },
      { value: 20, label: "无固定期限" },
      { value: 30, label: "以完成一定工作任务为限" },
    ],
  },
  {
    label: "合同名称",
    key: "name",
    widget: "input",
    required: true,
    disabled: type === "add" ? false : true,
    initialValue: (detailsData as any)?.name,
    span: "12",
    readSpan: 1,
  },
  {
    label: '合同起始日期',
    key: 'dateInput',
    widget: 'dateInput',
    span: "12",
    widgetProps: {
      format: 'YYYY-MM-DD'
    },
  },
  {
    label: '合同终止日期',
    key: 'dateInput2',
    widget: 'dateInput',
    span: "12",
    widgetProps: {
      format: 'YYYY-MM-DD'
    },
  },
]
export const bankInformation = ({ type, detailsData}: { type?: string, detailsData?: any}) => [
  {
    label: "银行卡号",
    key: "name",
    widget: "input",
    required: true,
    disabled: type === "add" ? false : true,
    initialValue: (detailsData as any)?.name,
    span: "12",
    readSpan: 1,
  },
  {
    label: "开户行",
    key: "bakn",
    widget: "input",
    required: true,
    disabled: type === "add" ? false : true,
    initialValue: (detailsData as any)?.name,
    span: "12",
    readSpan: 1,
  },
  
]