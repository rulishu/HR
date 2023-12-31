import { ProForm } from "@uiw-admin/components";

//搜索表单
const formSearchList = [
  {
    label: "姓名",
    key: "name",
    widget: "input",
  },
  {
    label: "所属部门",
    key: "workState",
    widget: "select",
    option: [
      { value: 10, label: "研发部" },
      { value: 20, label: "人事部" },
    ],
  },
  {
    label: "日期",
    key: "month",
    widget: "monthPicker",
    widgetProps: {
      format: 'YYYY-MM'
    },
  },
];

const Search = () => {
  const onScreenSubmit = (current: object) => { }

  return (
    <div className='formRecordAtt'>
      <ProForm
        formType="pure"
        showSaveButton
        showResetButton
        saveButtonProps={{
          type: "primary",
          label: '搜索'
        }}
        cardProps={{
          noHover: true,
        }}
        onSubmit={(_, current) => onScreenSubmit(current)}
        formDatas={formSearchList}
      />
    </div>
  )
}

export default Search;