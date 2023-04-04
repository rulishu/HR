import { useDispatch, Dispatch } from '@kkt/pro';
import { ProForm } from "@uiw-admin/components";

//搜索表单
const formSearchList = [
  {
    label: "用户名",
    key: "name",
    widget: "input",
  },
  {
    label: "是否禁用",
    widget: "radio",
    key: "locked",
    option: [
      { label: "正常", value: 1 },
      { label: "禁用", value: 2 },
    ],
  },
];

const Search = () => {
  const dispatch = useDispatch<Dispatch>();

  const onScreenSubmit = (current?: object) => {
    dispatch.sysUser.usersList({
      ...current,
      page: 1
    });
  }

  return (
    <div className="i--form">
      <ProForm
        formType="card"
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
    </div>
  )
}

export default Search;