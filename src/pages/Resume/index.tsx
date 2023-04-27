import { useEffect, useState } from 'react';
import { Tabs } from 'uiw';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import './style/index.css';
import TabsContent from './tabs';

const Index = () => {
  const {
    employeeInduction: { companyList = [] },
    resume: { page, pageSize }
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>()
  const [active, setActive] = useState('')

  useEffect(() => {
    dispatch.sysOrganization.selectList({
      callback: (data: any) => {
        dispatch.employeeInduction.updateState({
          companyList: data
        })
        setActive(data?.[0].id.toString())
        dispatch.resume.quickSelect({ companyId: data?.[0].id.toString(), page: page, pageSize: pageSize })
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
            page: page,
            pageSize: pageSize
          })
          dispatch.resume.update({
            companyId: key,
            page: 1,
            pageSize: 5
          })
        }}>
        {companyList?.filter((item: any) => item?.companyType === 1).map((itm: any) => {
          return (
            <Tabs.Pane label={itm.companyName} key={itm.id.toString()}>
              <TabsContent />
            </Tabs.Pane >
          )
        })}
        <Tabs.Pane label={'面试简历'} key={''}>
          <TabsContent />
        </Tabs.Pane >
      </Tabs >
    </>
  )
}
export default Index