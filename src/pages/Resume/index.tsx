import { useEffect } from 'react';
import { Tabs } from 'uiw';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import './style/index.css';
import TabsContent from './tabs';

const Index = () => {
  const {
    employeeInduction: { companyList = [] },
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<Dispatch>()
  useEffect(() => {
    dispatch.resume.quickSelect()
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
  }, [companyList])

  return (
    <>
      <Tabs
        type="line"
        activeKey={'2'}
        className='tabsRecord'
        onTabClick={(key, tab, e) => {
          console.log(111, key,);

          dispatch.resume.selectCVByCompany({
            companyId: key,
            type: 0
          })
        }}>
        {companyList.map((item: any) => {
          return (
            <Tabs.Pane label={item.companyName} key={item.id}>
              <TabsContent />
            </Tabs.Pane >)
        })
        }
      </Tabs >
    </>
  )
}
export default Index