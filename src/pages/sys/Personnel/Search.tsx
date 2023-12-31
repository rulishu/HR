import { useDispatch, Dispatch, useSelector, RootState, KktproKeys } from '@kkt/pro';
import { ProForm } from "@uiw-admin/components";

//搜索表单
const formSearchList = ({ companyList }: any) => [
  {
    label: "姓名",
    key: "staffName",
    widget: "input",
  },
  {
    label: "入职日期",
    key: "entryDateStart",
    widget: "dateInput",
    widgetProps: {
      format: 'YYYY-MM-DD'
    },
  },
  {
    label: "员工状态",
    key: "type",
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
        formDatas={formSearchList({ companyList })}
      />
    </div>
  )
}

export default Search;