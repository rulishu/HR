import { useDispatch, Dispatch } from '@kkt/pro';
import { ProForm } from "@uiw-admin/components";

//搜索表单
const formSearchList = [
  {
    label: "姓名",
    key: "name",
    widget: "input",
  },
  {
    label: "入职日期",
    key: "entryDate",
    widget: "dateInput",
  },
  {
    label: "手机号",
    key: "phone",
    widget: "dateInput",
  },
  {
    label: "所属部门",
    key: "department",
    widget: "select",
    option: [
      { value: 10, label: "研发部" },
      { value: 20, label: "人事部" },
    ],
  },
  {
    label: "员工状态",
    key: "state",
    widget: "select",
    option: [
      { value: 1, label: "正式" },
      { value: 3, label: "实习" },
      { value: 4, label: "试用" },
      { value: 2, label: "已离职" },
    ],
  },
];

const Search = () => {
  const dispatch = useDispatch<Dispatch>();

  const onScreenSubmit = (current?: object) => {
    dispatch.employeeProfile.selectStaffFile({
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
        label: '搜索'
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