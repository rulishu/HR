import { KktproKeys } from '@kkt/pro';

interface FormListProps {
  data?: any;
}

export const ModalTitle: KktproKeys = {
  add: '新增工作经历',
  edit: '编辑工作经历'
}

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
        { required: true, message: '请选择开始时间' },
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
        { required: true, message: '请选择结束时间' },
        { 
          validator: (value: any) => {
            if (data.startTime && value) {
              return data.startTime.valueOf() < value.valueOf();
            }
            return true;
          },
          message: '结束时间不能小于开始时间'
        }
      ],
    },
    {
      label: "工作单位",
      key: "company",
      widget: "input",
      required: true,
      initialValue: data?.company,
      span: "24",
      readSpan: 1,
      rules: [
        { required: true, message: '请输入工作单位' },
      ],
    },
    {
      label: "职位及主要工作职责",
      key: "desc",
      widget: "textarea",
      initialValue: data?.desc,
      span: "24",
      readSpan: 1,
      widgetProps: {
        rows: 10
      },
      required: true,
      rules: [
        { required: true, message: '请输入职位及主要工作职责' },
      ],
    },
  ]
}