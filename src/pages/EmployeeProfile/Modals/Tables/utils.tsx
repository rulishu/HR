import dayjs from 'dayjs';

export const educationColumn = () => [
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
  }
]

export const workColumn = () => [
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
    title: "职位及主要工作职责",
    key: "desc",
  },
]

export const familyColumn = () => [
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
  }
]