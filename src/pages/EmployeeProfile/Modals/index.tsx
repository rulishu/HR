import { Dispatch, RootState, useDispatch, useSelector } from "@kkt/pro";
import { ProDrawer, ProForm, useForm } from '@uiw-admin/components'
import { Tabs } from "uiw";
import { bankInformation, contractSituation, educationalInformation, formList, personalInformation, workInformation } from './utils';

function Modals() {
  const {
    employeeProfile: {
      isVisible,
      queryInfo,
      type,
    },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();
  const form = useForm();
  const personalForm = useForm()
  const workForm = useForm()
  const form1 = useForm();

  const updateData = (payload: { queryInfo: any; }) => {
    dispatch({
      type: 'employeeProfile/updateState',
      payload,
    })
  }

  //关闭弹窗
  const onClosed = () => {
    dispatch({
      type: "employeeProfile/updateState",
      payload: { isVisible: false },
    });
  };

  return (
    <ProDrawer
        visible={isVisible}
        width={800}
        onClose={() => onClosed()}
        title={type === "add" ? "新增" : "编辑"}
        buttons={[
          {
            label: '保存',
            type: 'primary',
            style: { width: '80px' },
            onClick: async() => {
              // 触发验证
              await form?.submitvalidate()
              await personalForm?.submitvalidate()
              // 获取错误信息
              const errors = form.getError()
              const errors2 = personalForm.getError()
    
              if(errors && Object.keys(errors).length > 0 ) return
              if(errors2 && Object.keys(errors2).length > 0 ) return
              dispatch({
                type: `employeeProfile/${type === 'add' ? 'insert' : 'addTeam'}`,
                payload: {
                  ...queryInfo,
                },
              })
           },
          },
        ]}>
    
      <ProForm
        form={form}
        formType="pure"
        readOnlyProps={{ column: 2 }}
        onChange={(initial, current) => 
          updateData({ queryInfo: { ...queryInfo, ...current } })
        }
        formDatas={formList({ type, queryInfo })}
      />
      <Tabs type="card" activeKey="1" onTabClick={(tab, key, e) => {
          console.log("=>", key, tab);
        }}>
        <Tabs.Pane label="个人信息" key="1">
          <ProForm
          form={personalForm}
          formType="pure"
          readOnlyProps={{ column: 2 }}
          formDatas={personalInformation({ type, queryInfo })}
        />
        </Tabs.Pane>
        <Tabs.Pane label="工作信息" key="2">
        <ProForm
          form={workForm}
          formType="pure"
          readOnlyProps={{ column: 2 }}
          formDatas={workInformation({ type, queryInfo })}
        />
        </Tabs.Pane>
        <Tabs.Pane label="教育信息" key="3">
        <ProForm
          form={form1}
          formType="pure"
          readOnlyProps={{ column: 2 }}
          formDatas={educationalInformation({ type, queryInfo })}
        />
        </Tabs.Pane>
        <Tabs.Pane label="合同情况" key="4">
        <ProForm
          form={form1}
          formType="pure"
          readOnlyProps={{ column: 2 }}
          formDatas={contractSituation({ type, queryInfo })}
        />
        </Tabs.Pane>
        <Tabs.Pane label="银行卡信息" key="5">
        <ProForm
          form={form1}
          formType="pure"
          readOnlyProps={{ column: 2 }}
          formDatas={bankInformation({ type, queryInfo })}
        />
        </Tabs.Pane>
      </Tabs>
      </ProDrawer>
  );
}

export default Modals;
