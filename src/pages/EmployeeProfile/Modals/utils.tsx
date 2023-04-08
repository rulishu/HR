// import { KktproKeys } from "@kkt/pro";
interface FormListProps {
  type?: string,
  queryInfo?: any;
}

export const formListData = ({
  type,
  queryInfo,
}: FormListProps) => [
  {
    label: "姓名",
    key: "name",
    widget: "input",
    required: true,
    span: "12",
    readSpan: 1,
    rules: [
      { required: true, message: '请输入' },
     ]
  },
  {
    label: "手机号码",
    key: "phone",
    widget: "input",
    required: true,
    span: "12",
    readSpan: 1,
    rules: [
      { required: true, message: '请输入' },
      { pattern: new RegExp(/[1][3][0-9]{9}$/), message: "请输入正确手机号" },
     ]
  },
  {
    label: '部门',
    key: 'department',
    widget: 'select',
    span: "12",
    option: [
      { value: 10, label: "研发部" },
      { value: 20, label: "人事部" },
    ],
  },
  {
    label: '职位',
    key: 'post',
    widget: 'select',
    span: "12",
    option: [
      { value: 10, label: "研发" },
      { value: 20, label: "人事" },
    ],
  },
  {
    label: "邮箱",
    key: "email",
    widget: "input",
    disabled: type === "add" ? false : true,
    span: "12",
    readSpan: 1,
  },
  {
    label: '入职日期',
    key: 'entryDate',
    widget: 'dateInput',
    span: "12",
    widgetProps: {
      format: 'YYYY-MM-DD'
    },
    required: true,
    readSpan: 1,
    rules: [
      { required: true, message: '请选择' },
     ]
  },
]

export const personalInformation = ({ type, queryInfo}: { type?: string, queryInfo?: any}) => [
  // {
  //   label: '证件类型',
  //   key: 'select1',
  //   widget: 'select',
  //   span: "12",
  //   option: [
  //     { value: 10, label: "身份证" },
  //     { value: 20, label: "护照" },
  //     { value: 30, label: "军官证" },
  //     { value: 40, label: "台胞证" },
  //     { value: 50, label: "其他" },
  //   ],
  // },
  {
    label: "身份证号",
    key: "idNumber",
    widget: "input",
    required: true,
    span: "12",
    readSpan: 1,
    rules: [
      { required: true, message: '请输入' },
     ]
  },
  {
    label: '出生日期',
    key: 'birth',
    widget: 'dateInput',
    span: "12",
    widgetProps: {
      format: 'YYYY-MM-DD'
    },
  },
  {
    label: '性别',
    key: 'gender',
    widget: 'select',
    span: "12",
    option: [
      { value: 10, label: "男" },
      { value: 20, label: "女" },
    ],
  },
  {
    label: '婚姻状况',
    key: 'isMarried',
    widget: 'select',
    span: "12",
    option: [
      { value: 10, label: "未婚" },
      { value: 20, label: "已婚" },
      { value: 30, label: "已婚已育" },
      { value: 40, label: "离异" },
    ],
  },
  // {
  //   label: "户口所在地",
  //   key: "hukou",
  //   widget: "input",
  //   required: true,
  //   // initialValue: (detailsData as any)?.desc,
  //   span: "12",
  //   readSpan: 1,
  // },
  // {
  //   label: '户籍类型',
  //   key: 'select4',
  //   widget: 'select',
  //   span: "12",
  //   option: [
  //     { value: 10, label: "城镇" },
  //     { value: 20, label: "非城镇" },
  //   ],
  // },
  {
    label: "现居地",
    key: "livingPlace",
    widget: "input",
    required: true,
    span: "12",
    readSpan: 1,
  },
  {
    label: "民族",
    key: "nationality",
    widget: "input",
    required: true,
    span: "12",
    readSpan: 1,
  },
  {
    label: "籍贯",
    key: "nativePlace",
    widget: "input",
    required: true,
    span: "12",
    readSpan: 1,
  },
  {
    label: '政治面貌',
    key: 'politicalStatus',
    widget: 'select',
    span: "12",
    option: [
      { value: 10, label: "团员" },
      { value: 20, label: "党员" },
      { value: 30, label: "群众" },
      { value: 40, label: "其他" },
    ],
  },
  // {
  //   label: "个人社保账号",
  //   key: "des1",
  //   widget: "input",
  //   required: true,
  //   initialValue: (detailsData as any)?.desc,
  //   span: "12",
  //   readSpan: 1,
  // },
  // {
  //   label: "个人公积金账号",
  //   key: "de1",
  //   widget: "input",
  //   required: true,
  //   initialValue: (detailsData as any)?.desc,
  //   span: "12",
  //   readSpan: 1,
  // },
]
export const educationalItem = ({ type, queryInfo}: { type?: string, queryInfo?: any}) => [
  {
    label: '时间',
    key: 'time',
    widget: 'dateInput',
    widgetProps: {
      format: 'YYYY-MM-DD'
    },
  },
 {
   label: '学校',
   key: 'school',
   widget: 'input',
   initialValue: '',
   required:true,
   rules: [
     { required: true, message: '请输入' },
   ]
 },
 {
   label: '专业',
   key: 'specialize',
   widget: 'input',
   initialValue: '',
   required:true,
   rules: [
     { required: true, message: '请输入' },
   ]
 },
]
export const workInformation = ({ type, queryInfo}: { type?: string, queryInfo?: any}) => [
  {
    label: '时间',
    key: 'endTime',
    widget: 'dateInput',
    widgetProps: {
      format: 'YYYY-MM-DD'
    },
  },
  {
    label: "工作单位",
    key: "company",
    widget: "input",
    required: true,
    disabled: type === "add" ? false : true,
    readSpan: 1,
  },
  {
    label: "职务及工作内容",
    key: "desc",
    widget: "input",
    required: true,
    disabled: type === "add" ? false : true,
    readSpan: 1,
  },
]
export const contractSituation = ({ type, queryInfo}: { type?: string, queryInfo?: any}) => [
  {
    label: "姓名",
    key: "name",
    widget: "input",
    required: true,
    disabled: type === "add" ? false : true,
    readSpan: 1,
  },
  {
    label: "关系",
    key: "relation",
    widget: "input",
    required: true,
    disabled: type === "add" ? false : true,
    readSpan: 1,
  },
  {
    label: "现单位及职务",
    key: "desc",
    widget: "input",
    required: true,
    disabled: type === "add" ? false : true,
    readSpan: 1,
  },
]
// export const bankInformation = ({ type, queryInfo}: { type?: string, queryInfo?: any}) => [
//   {
//     label: '起止日期',
//     key: 'endTime',
//     widget: 'dateInput',
//     widgetProps: {
//       format: 'YYYY-MM-DD'
//     },
//   },
//   {
//     label: "工作单位",
//     key: "company",
//     widget: "input",
//     required: true,
//     disabled: type === "add" ? false : true,
//     initialValue: (queryInfo as any)?.name,
//     span: "12",
//     readSpan: 1,
//   },
//   {
//     label: "职务及工作内容",
//     key: "desc",
//     widget: "input",
//     required: true,
//     disabled: type === "add" ? false : true,
//     initialValue: (queryInfo as any)?.name,
//     span: "12",
//     readSpan: 1,
//   }, 
// ]
export const addItems = (data?: any, queryInfo?: any)=>[
  {
    label: '起止日期',
    key: 'time',
    widget: 'dateInput',
    widgetProps: {
      format: 'YYYY-MM-DD'
    },
  },
 {
   label: '学校',
   key: 'school',
   widget: 'input',
   initialValue: '',
   required:true,
   rules: [
     { required: true, message: '请输入' },
   ]
 },
 {
   label: '专业',
   key: 'specialize',
   widget: 'input',
   initialValue: '',
   required:true,
   rules: [
     { required: true, message: '请输入' },
   ]
 },
//  {
//    label: '证书情况',
//    key: 'certificate',
//    widget: 'input',
//    initialValue: '',
//    required:true,
//    rules: [
//      { required: true, message: '请输入' },
//    ]
//  },
]