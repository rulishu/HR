import { TipButton } from '@/components';

export const educationColumn = () => [
  {
    title: "时间",
    key: "a"
  },
  {
    title: "学校名称",
    key: "b",
  },
  {
    title: "专业",
    key: "b",
  },
  {
    title: "证书情况",
    key: "b",
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
    key: "a"
  },
  {
    title: "工作单位",
    key: "b",
  },
  {
    title: "职位及主要工作职责",
    key: "c",
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

export const familyColumn = () => [
  {
    title: "姓名",
    key: "a"
  },
  {
    title: "年龄",
    key: "b",
  },
  {
    title: "关系",
    key: "c",
  },
  {
    title: "现工作单位及职务",
    key: "d",
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