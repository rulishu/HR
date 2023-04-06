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
    label: "所属部门",
    key: "department",
    widget: "select",
    option: [
      { value: 10, label: "研发部" },
      { value: 20, label: "人事部" },
    ],
  },
  {
    label: "员工类型",
    key: "employeeStatus",
    widget: "select",
    option: [
      { value: 10, label: "兼职" },
      { value: 20, label: "劳务派遣" },
      { value: 30, label: "全职" },
      { value: 40, label: "实习" },
    ],
  },
  {
    label: "员工状态",
    key: "state",
    widget: "select",
    option: [
      { value: 1, label: "正式" },
      { value: 20, label: "试用" },
      { value: 3, label: "实习" },
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
  )
}

export default Search;