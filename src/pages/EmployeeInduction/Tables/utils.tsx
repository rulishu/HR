import { TipButton } from '@/components';

interface FormListProps {
  onEdit?: (data: any, index: number) => void;
  onRemove?: (data: any, index: number) => void;
}


export const educationColumn = () => [
  {
    title: "时间",
    key: "time",
    render: (text: any, key: any, rowData: any) => {
      const { startTime, endTime } = rowData;
      if (!startTime || !endTime) return '--'
      return startTime + ' ~ ' + endTime;
    },
  },
  {
    title: "学校名称",
    key: "school",
  },
  {
    title: "专业",
    key: "specialize",
  },
  {
    title: "证书情况",
    key: "certificate",
  },
  {
    title: "操作",
    key: "edit",
    width: 100,
    render: (text: any, key: any, rowData: any) => {
      return (
        <>
          <TipButton
            tip="编辑"
            icon="edit"
            type="primary"
          />
          <TipButton
            tip="删除"
            type="danger"
            icon="delete"
          />
        </>
      );
    },
  },
]

export const workColumn = () => [
  {
    title: "起止日期",
    key: "time",
    render: (text: any, key: any, rowData: any) => {
      const { startTime, endTime } = rowData;
      if (!startTime || !endTime) return '--'
      return startTime + ' ~ ' + endTime;
    },
  },
  {
    title: "工作单位",
    key: "company",
  },
  {
    title: "职位及主要工作职责",
    key: "desc",
  },
  {
    title: "操作",
    key: "edit",
    width: 100,
    render: (text: any, key: any, rowData: any) => {
      return (
        <>
          <TipButton
            tip="编辑"
            icon="edit"
            type="primary"
          />
          <TipButton
            tip="删除"
            type="danger"
            icon="delete"
          />
        </>
      );
    },
  },
]

export const familyColumn = ({ onEdit, onRemove }: FormListProps) => [
  {
    title: "姓名",
    key: "name"
  },
  {
    title: "电话",
    key: "memberPhone",
  },
  {
    title: "年龄",
    key: "age",
  },
  {
    title: "关系",
    key: "relation",
  },
  {
    title: "现工作单位及职务",
    key: "desc",
  },
  {
    title: "操作",
    key: "edit",
    width: 100,
    render: (text: any, key: string, rowData: any, rowNumber: number) => {
      console.log(444444, key, rowData)
      return (
        <>
          <TipButton
            tip="编辑"
            icon="edit"
            type="primary"
            onClick={() => onEdit?.(rowData, rowNumber)}
          />
          <TipButton
            tip="删除"
            type="danger"
            icon="delete"
            onClick={() => onRemove?.(rowData, rowNumber)}
          />
        </>
      );
    },
  },
]