export interface formDataProps {
  title: string;
  tips?: string;
  /**
   * @education 教育经历
   * @work 工作经历
   * @family 家庭成员
  */
  type?: 'education' | 'work' | 'family';
  child?: any[];
}

export const formData: formDataProps[] = [
  {
    title: '入职信息',
    child: [
      {
        label: "入职公司",
        key: "a",
        widget: "select",
        option: [
          { value: 10, label: "研发部" },
          { value: 20, label: "人事部" },
        ],
      },
      {
        label: "入职部门",
        key: "b",
        widget: "select",
        option: [
          { value: 10, label: "研发部" },
          { value: 20, label: "人事部" },
        ],
      },
      {
        label: "入职岗位",
        key: "c",
        widget: "select",
        option: [
          { value: 10, label: "研发部" },
          { value: 20, label: "人事部" },
        ],
      },
    ]
  },
  {
    title: '基本信息',
    child: [
      {
        label: "姓名",
        key: "b1",
        widget: "input",
      },
      {
        label: "性别",
        key: "b2",
        widget: "radio",
        option: [
          { value: 10, label: "男" },
          { value: 20, label: "女" },
        ],
      },
      {
        label: "出生日期",
        key: "b3",
        widget: "dateInput",
      },
      {
        label: "体重",
        key: "b4",
        widget: "input",
      },
      {
        label: "身高",
        key: "b5",
        widget: "input",
      },
      {
        label: "名族",
        key: "b6",
        widget: "input",
      },
      {
        label: "政治面貌",
        key: "b7",
        widget: "input",
      },
      {
        label: "籍贯",
        key: "b8",
        widget: "input",
      },
      {
        label: "婚姻装款",
        key: "b9",
        widget: "select",
        option: [
          { value: 10, label: "已婚" },
          { value: 20, label: "未婚" },
        ],
      },
      {
        label: "身份证号",
        key: "b10",
        widget: "input",
      },
      {
        label: "联系电话",
        key: "b11",
        widget: "input",
      },
      {
        label: "E-mail",
        key: "mail",
        widget: "input",
      },
      {
        label: "户籍所在地",
        key: "b12",
        widget: "input",
        span: 8,
      },
      {
        label: "现居地址",
        key: "b13",
        widget: "input",
        span: 16,
      },
      {
        label: "学历",
        key: "b14",
        widget: "select",
        option: [
          { value: '初中', label: "初中" },
          { value: '高中', label: "高中" },
          { value: '专科', label: "专科" },
          { value: '本科', label: "本科" },
          { value: '硕士研究生', label: "硕士研究生" },
          { value: '博士研究生', label: "博士研究生" },
        ],
      },
      {
        label: "学位",
        key: "b15",
        widget: "input",
      },
      {
        label: "专业",
        key: "b16",
        widget: "input",
      },
    ]
  },
  {
    title: '教育经历',
    type: 'education',
  },
  {
    title: '工作经历',
    type: 'work',
  },
  {
    title: '家庭成员',
    type: 'family',
  },
]