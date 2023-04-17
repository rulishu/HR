import dayjs from 'dayjs';
import { TipButton } from '@/components';

interface FormListProps {
  onEdit?: (data: any, index: number) => void;
  onRemove?: (data: any, index: number) => void;
  type: 'edit' | 'look'
}


export const educationColumn = ({ onEdit, onRemove, type }: FormListProps) => {
  const column = [
    {
      title: "时间",
      key: "time",
      width: 220,
      render: (text: any, key: any, rowData: any) => {
        const { startTime, endTime } = rowData;
        if (!startTime || !endTime) return '--'
        const start = dayjs(startTime).format('YYYY-MM')
        const end = dayjs(endTime).format('YYYY-MM')
        return <div style={{ width: 180 }}>{start + ' ~ ' + end}</div>;
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
      render: (text: any, key: any, rowData: any, rowNumber: number) => {
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
  if (type === 'look') {
    column.pop();
  }
  return column
}

export const workColumn = ({ onEdit, onRemove, type }: FormListProps) => {
  const column = [
    {
      title: "起止日期",
      key: "time",
      width: 220,
      render: (text: any, key: any, rowData: any) => {
        const { startTime, endTime } = rowData;
        if (!startTime || !endTime) return '--'
        const start = dayjs(startTime).format('YYYY-MM-DD')
        const end = dayjs(endTime).format('YYYY-MM-DD')
        return <div style={{ width: 180 }}>{start + ' ~ ' + end}</div>;
      },
    },
    {
      title: "工作单位",
      key: "company",
    },
    {
      title: "职位",
      key: "post",
    },
    {
      title: "工资",
      key: "salary",
    },
    {
      title: "主要工作职责",
      key: "desc",
    },
    {
      title: "离职原因",
      key: "reasonForLeave",
    },
    {
      title: "操作",
      key: "edit",
      width: 100,
      render: (text: any, key: any, rowData: any, rowNumber: number) => {
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
  if (type === 'look') {
    column.pop();
  }
  return column;
}

export const familyColumn = ({ onEdit, onRemove, type }: FormListProps) => {
  const column = [
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
  if (type === 'look') {
    column.pop();
  }
  return column;
}