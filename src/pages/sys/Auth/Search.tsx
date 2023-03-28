import { ProForm } from "@uiw-admin/components";

//搜索表单
const formSearchList = [
  {
    label: "用户名",
    key: "name",
    widget: "input",
  },
  {
    label: "有效性",
    widget: "radio",
    key: "enable",
    option: [
      { label: "有效", value: "true" },
      { label: "失效", value: "false" },
    ],
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