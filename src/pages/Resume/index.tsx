import { useEffect, useState } from 'react';
import { Tabs, Loader } from 'uiw';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import './style/index.css';
import TabsContent from './tabs';

const Index = () => {
  const {
    loading,
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
        dispatch.resume.update({
          companyId: data?.[0].id.toString(),
        })
        setActive(data?.[0].id.toString())
        dispatch.resume.quickSelect({ companyId: data?.[0].id.toString(), page: page, pageSize: pageSize })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (

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
            <Loader
              loading={loading.effects.resume.downZip}
              tip="加载中..."
              style={{ width: "100%", height: '100%', flex: 1 }}
              bgColor="rgba(255, 255, 255, .7)"
            >
              <TabsContent />
            </Loader>
          </Tabs.Pane >
        )
      })}
      <Tabs.Pane label={'面试简历'} key={''}>
        <Loader
          loading={loading.effects.resume.downZip}
          tip="加载中..."
          style={{ width: "100%", height: '100%', flex: 1 }}
          bgColor="rgba(255, 255, 255, .7)"
        >
          <TabsContent />
        </Loader>
      </Tabs.Pane >
    </Tabs >
  )
}
export default Index