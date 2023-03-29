import { useDispatch, Dispatch } from '@kkt/pro';
import { ProForm } from "@uiw-admin/components";

//搜索表单
const formSearchList = [
  {
    label: "角色名",
    key: "name",
    widget: "input",
  },
];

const Search = () => {
  const dispatch = useDispatch<Dispatch>();

  const onScreenSubmit = (current?: object) => {
    dispatch.sysRole.roleList({
      ...current,
      page: 1
    });
  }

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