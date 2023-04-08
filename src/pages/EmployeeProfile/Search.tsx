import { useDispatch, Dispatch } from '@kkt/pro';
import { ProForm } from "@uiw-admin/components";
import formatter from "@uiw/formatter";

//搜索表单
const formSearchList = [
  {
    label: "姓名｜手机号",
    key: "search",
    widget: "input",
    placeholder: "请输入姓名或手机号"
  },
  {
    label: "入职日期",
    key: "entryDateStart",
    widget: "dateInput",
    widgetProps: {
      format: 'YYYY-MM-DD'
    },
  },
  // {
  //   label: "离职日期",
  //   key: "entryDateEnd",
  //   widget: "dateInput",
  //   widgetProps: {
  //     format: 'YYYY-MM-DD'
  //   },
  // },
  // {
  //   label: "所属职位",
  //   key: "post",
  //   widget: "select",
  //   option: [
  //     { value: 10, label: "研发部" },
  //     { value: 20, label: "人事部" },
  //   ],
  // },
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

  const onScreenSubmit = (current?: any) => {
    dispatch.employeeProfile.selectStaffFile({
      ...current,
      entryDateStart: current?.entryDateStart && formatter(
        "YYYY-MM-DD",
        new Date(current?.entryDateStart)
      ),
      // entryDateEnd: current?.entryDateEnd && formatter(
      //   "YYYY-MM-DD",
      //   new Date(current?.entryDateEnd)
      // ),
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