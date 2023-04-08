import { ProForm } from "@uiw-admin/components";

//搜索表单
const formSearchList = [
  {
    label: "姓名",
    key: "name",
    widget: "input",
  },
  {
    label: "入职时间",
    key: "workState",
    widget: "dateInput",
  },
  {
    label: "离职时间",
    key: "timeState",
    widget: "dateInput",
  },
];

const Search = () => {
  const onScreenSubmit = (current: object) => {}

  return (
    <ProForm
      formType="pure"
      showSaveButton
      showResetButton
      saveButtonProps={{
        type: "primary",
      }}
      cardProps={{
        noHover: true,
      }}
      onSubmit={(_, current) => onScreenSubmit(current)}
      formDatas={formSearchList}
    />
  )
}

export default Search;