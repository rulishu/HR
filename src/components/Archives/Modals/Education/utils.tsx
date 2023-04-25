import { KktproKeys } from '@kkt/pro';
import { valid } from '@/utils/valid';
interface FormListProps {
  data?: any;
}

export const ModalTitle: KktproKeys = {
  add: '新增教育经历',
  edit: '编辑教育经历'
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
      },
      rules: [
        { required: true, message: '请选择开始时间' },
      ],
    },
    {
      label: "结束时间",
      key: "endTime",
      widget: "dateInput",
      initialValue: data?.endTime,
      span: "12",
      readSpan: 1,
      widgetProps: {
        format: 'YYYY-MM-DD',
        autoClose: true
      },
      rules: [
        // { required: true, message: '请选择结束时间' },
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
      label: "学校名称",
      key: "school",
      widget: "input",
      required: true,
      initialValue: data?.school,
      span: "24",
      readSpan: 1,
      rules: [
        { required: true, message: '请输入学校名称' },
        {
          validator: (value: any) => {
            if (value) {
              return valid.isNativePlace(value);
            }
            return true;
          },
          message: '请填写汉字'
        }
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