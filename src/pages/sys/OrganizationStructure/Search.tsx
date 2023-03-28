import { ProForm } from "@uiw-admin/components";

//搜索表单
const formSearchList = [
  {
    label: "机构名称",
    key: "name",
    widget: "input",
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