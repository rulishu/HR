import { Fragment } from 'react';
import { Card, Tabs } from 'uiw';
import Search from './Search';
import Table from './Table';
import MakeupRecord from '../MakeupRecord'
import LeaveRecord from '../LeaveRecord'
import OvertimeRecord from '../OvertimeRecord'
import '../style/index.css';

const Page = () => {
  return (
    <Fragment>
      <Tabs className='tabsRecord' type="line" activeKey="1" onTabClick={(key, tab, e) => {
        console.log("=>", key, tab);
      }}>
        <Tabs.Pane label="出勤记录" key="1">
          <Card noHover bordered={false} style={{ marginBottom: 14 }}><Search /></Card>
          <Card noHover bordered={false}><Table /></Card>
        </Tabs.Pane>
        <Tabs.Pane label="补卡记录" key="2">
          <MakeupRecord />
        </Tabs.Pane>
        <Tabs.Pane label="请假记录" key="3">
          <LeaveRecord />
        </Tabs.Pane>
        <Tabs.Pane label="加班记录" key="4">
          <OvertimeRecord />
        </Tabs.Pane>
      </Tabs>
    </Fragment>
  )
}

export default Page;