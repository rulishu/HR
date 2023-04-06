import { KktproKeys } from '@kkt/pro';

interface FormListProps {
  data?: any;
}

export const ModalTitle: KktproKeys = {
  add: '新增教育经历',
  edit: '编辑教育经历'
}

// const disabledDate = (currentDate: Date) => {
//   // 今天和今天之前不能选择
//   return currentDate && currentDate.valueOf() < Date.now();
// }

export const formList = (props?: FormListProps) => {
  const { data } = props || {};
  return [
    {
      label: "开始时间",
      key: "startTime",
      widget: "dateInput",
      required: true,
      initialValue: data?.startTime,
      span: "12",
      readSpan: 1,
      widgetProps: {
        format: 'YYYY-MM-DD',
        autoClose: true
      },
      rules: [
        { required: true, message: '请输入字典类别名称' },
      ],
    },
    {
      label: "结束时间",
      key: "endTime",
      widget: "dateInput",
      required: true,
      initialValue: data?.endTime,
      span: "12",
      readSpan: 1,
      widgetProps: {
        format: 'YYYY-MM-DD',
        autoClose: true
      },
      rules: [
        { required: true, message: '请输入字典类别名称' },
      ],
    },
    {
      label: "学校名称",
      key: "school",
      widget: "input",
      required: true,
      initialValue: data?.school,
      span: "24",
      readSpan: 1,
      rules: [
        { required: true, message: '请输入学校名称' },
      ],
    },
    {
      label: "专业",
      key: "specialize",
      widget: "input",
      initialValue: data?.specialize,
      span: "12",
      readSpan: 1,
    },
    {
      label: "证书情况",
      key: "certificate",
      widget: "input",
      initialValue: data?.certificate,
      span: "12",
      readSpan: 1,
    },
  ]
}