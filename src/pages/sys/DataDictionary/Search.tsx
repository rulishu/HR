import { useDispatch, Dispatch  } from '@kkt/pro';
import { ProForm } from "@uiw-admin/components";

//搜索表单
const formSearchList = [
  {
    label: "字典类别名称",
    key: "dictName",
    widget: "input",
  },
  {
    label: "字典类别编号",
    key: "dictType",
    widget: "input",
  },
  {
    label: "状态",
    key: "enable",
    widget: "radio",
    option: [
      { label: '正常', value: '0' },
      { label: '停用', value: '1'}
    ]
  },
];

const Search = () => {
  const dispatch = useDispatch<Dispatch>();

  const onScreenSubmit = (current: object) => {
    dispatch.sysDataDictionary.updateState({
      page: 1,
      dictData: undefined,
      dictDataList: []
    });
    dispatch.sysDataDictionary.selectList({ ...current });
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