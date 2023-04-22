import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { ProForm } from "@uiw-admin/components";

//搜索表单
const formSearchList = ({ dictObject }: any) => [
  {
    label: "姓名",
    key: "staffName",
    widget: "input",
  },
  {
    label: "职位",
    key: "post",
    widget: "select",
    option: dictObject['post']?.child,
  },
  
  {
    label: "外派状态",
    key: "flag",
    widget: "select",
    option: [
      { value: 1, label: "入场" },
      { value: 2, label: "离场" },
    ],
  },
];

const Search = () => {
  const {
    global: { dictObject },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  const onScreenSubmit = (current: object) => {
    dispatch.sysOrganization.selectListStaff({ ...current });
  }

  return (
    <div className="i--form">
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
        formDatas={formSearchList({ dictObject })}
      />
    </div>
  )
}

export default Search;