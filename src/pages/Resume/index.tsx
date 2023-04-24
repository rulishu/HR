import { useEffect, useState } from 'react';
import { Tabs } from 'uiw';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import './style/index.css';
import TabsContent from './tabs';

const Index = () => {
  const {
    employeeInduction: { companyList = [] },
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>()
  const [active, setActive] = useState('')

  useEffect(() => {
    dispatch.resume.quickSelect({ companyId: '2', type: 1 })
    dispatch.sysOrganization.selectList({
      callback: (data: any) => {
        dispatch.employeeInduction.updateState({
          companyList: data
        })
        setActive('2')
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Tabs
        type="line"
        activeKey={active}
        className='tabsRecord'
        onTabClick={(key, tab, e) => {
          dispatch.resume.quickSelect({
            companyId: key,
            type: 1
          })
          dispatch.resume.update({ companyId: key })
        }}>
        {companyList.map((item: any) => {
          return (
            <Tabs.Pane label={item.companyName} key={item.id.toString()}>
              <TabsContent />
            </Tabs.Pane >)
        })
        }
      </Tabs >
    </>
  )
}
export default Index