import { Fragment, useEffect, useRef } from 'react';
import { useDispatch, Dispatch, useSelector, RootState, KktproKeys } from '@kkt/pro';
import { Card, Tabs } from 'uiw';
import { FormPage, Archives, ArchivesType } from '@/components'
import Search from './Search';
import Table from './Table';
import Modals from './Modals/information';
import './style/index.css'

const Page = () => {
  const {
    employeeInduction: {
      companyList = [],
    },
    employeeProfile: {
      queryInfo,
      activeKey
    },
    global: { userData },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();
  const archivesRef = useRef<ArchivesType>(null);

  useEffect(() => {
    dispatch.employeeProfile.updateState({
      activeKey: '1'
    })
    dispatch.employeeProfile.selectStaffFile({ isApproved: 1 });
    if (companyList.length === 0) {
      dispatch.sysOrganization.selectList({
        callback: (data: any) => {
          dispatch.employeeInduction.updateState({
            companyList: data
          })
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * 提交
  */
  const onSubmit = async () => {
    const { userId } = userData as any || {};
    const values: KktproKeys = await archivesRef.current?.submitvalidate() || {};
    if (Object.keys(values).length !== 0) {
      dispatch.employeeInduction.submit({
        ...values,
        userId,
        callback: () => {
          if (!values.id) {
            onReset();
          }
        }
      })
    }
  }

  const onReset = async () => {
    archivesRef.current?.reset();
  }

  return (
    <Fragment>
      <Tabs className='tabsRecord' type="line" activeKey={activeKey} onTabClick={(key, tab, e) => {
        dispatch.employeeProfile.updateState({
          activeKey: key
        })
      }}>
        <Tabs.Pane label="人员信息档案记录" key="1">
          <Card noHover bordered={false} style={{ marginBottom: 14 }}><Search /></Card>
          <Card noHover bordered={false}><Table /></Card>
        </Tabs.Pane>
        <Tabs.Pane label="人员信息档案" key="2">
          <FormPage
            buttons={[
              {
                type: "primary",
                label: '提交',
                onClick: onSubmit
              },
              {
                label: '重置',
                hide: queryInfo && (queryInfo as any).id,
                onClick: onReset
              },
            ]}
          >
            <Archives
              ref={archivesRef}
              data={queryInfo}
              contract={1}
            />
          </FormPage>
        </Tabs.Pane>
      </Tabs>
      <Modals />
    </Fragment>
  )
}

export default Page;