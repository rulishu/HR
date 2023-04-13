import { Fragment, useEffect } from 'react';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { Card, Tabs } from 'uiw';
import Search from './Search';
import Table from './Table';
import Modals from './Modals/information';

const Page = () => {
  const {
    employeeInduction: {
      companyList = [],
    },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    dispatch.employeeProfile.selectStaffFile();
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
  return (
    <Fragment>
      <Tabs className='tabsRecord' type="line" activeKey="1" onTabClick={(key, tab, e) => {
        console.log("=>", key, tab);
      }}>
        <Tabs.Pane label="人员信息档案记录" key="1">
          <Card noHover bordered={false} style={{ marginBottom: 14 }}><Search /></Card>
          <Card noHover bordered={false}><Table /></Card>
        </Tabs.Pane>
      </Tabs>
      <Modals />
    </Fragment>
  )
}

export default Page;