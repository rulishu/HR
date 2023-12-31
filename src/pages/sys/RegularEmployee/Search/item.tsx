
export const formDatasList = [
  {
    label: '实际申请人',
    key: 'user',
    widget: 'select',
    initialValue: '',
    option: [
      { value: 1, label: '苹果' },
      { value: 2, label: '西瓜' },
      { value: 3, label: '香蕉' },
      { value: 4, label: '东北大冻梨' }
    ],
  },
  {
    label: '入职日期',
    key: 'date',
    widget: 'dateInput',
    initialValue: '',
    widgetProps: {
      format: 'YYYY-MM-DD'
    },
  },
  {
    label: '试用期',
    key: 'try',
    widget: 'select',
    initialValue: '',
    option: [
      { value: 10, label: '3个月' },
      { value: 20, label: '6个月' },
    ],
  },
]
