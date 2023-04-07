import { Fragment, useEffect } from 'react';
import { useDispatch, Dispatch } from '@kkt/pro';
import { Card, Tabs } from 'uiw';
import Search from './Search';
import Table from './Table';
import Modals from './Modals'

const Page = () => {
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    dispatch.employeeProfile.selectStaffFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Fragment>
      <Tabs className='tabsRecord' type="line" activeKey="1" onTabClick={(key, tab, e) => {
        console.log("=>", key, tab);
      }}>
        <Tabs.Pane label="人员信息档案" key="1">
          <Modals />
        </Tabs.Pane>
        <Tabs.Pane label="人员信息档案记录" key="2">
          <Card noHover bordered={false} style={{ marginBottom: 14 }}><Search /></Card>
          <Card noHover bordered={false}><Table /></Card>
        </Tabs.Pane>
      </Tabs>
    </Fragment>
  )
}

export default Page;