import { useDispatch, Dispatch, useSelector, RootState, KktproKeys  } from '@kkt/pro';
import { ProForm } from "@uiw-admin/components";

//搜索表单
const formSearchList = ({ companyList }: any) => [
  {
    label: "项目组",
    key: "groupName",
    widget: "input",
  },
  {
    label: "机构名称",
    key: "companyName",
    widget: "select",
    option: companyList.map((item: KktproKeys) => ({ label: item.companyName, value: item.companyName })),
  },
];

const Search = () => {
  const {
    sysItemsModal: {
      companyList
    },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  const onScreenSubmit = (current: object) => {
    dispatch.sysItems.selectList({ ...current });
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
        formDatas={formSearchList({ companyList })}
      />
    </div>
  )
}

export default Search;