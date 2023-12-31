import { Fragment, useEffect, useState } from 'react';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { Row, Col, Menu, Card, Loader} from 'uiw';
import Modals from './Modals';
import EmployeeDetails from './Modals/EmployeeDetails'
import { FlexCol, CardWrap } from './style/style';
import './style/index.css';
import Search from './Search';
import Table from './Table';

const Page = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    loading,
    employeeInduction: { companyList },
  } = useSelector((state: RootState) => state);
  const [companyId, setCompanyId] = useState()

  useEffect(() => {
    dispatch.sysOrganization.selectList({
      callback: (data: any) => {
        setCompanyId(data?.[0].id)
        dispatch.sysOrganization.selectListStaff({
          id: data?.[0]?.id,
          callback: (res: any) => {
            dispatch.sysOrganization.updateState({
              dataListStaff: res
            })
            // dispatch.sysOrganization.selectEntranceOrDeparture({ id: res?.[0]?.id, })
          }
        });
        dispatch.employeeInduction.updateState({
          companyList: data
        })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onButName = (data: any) => {
    setCompanyId(data.id)
    dispatch.sysOrganization.selectListStaff({
      id: data.id,
      callback: (res: any) => {
        dispatch.sysOrganization.updateState({
          dataListStaff: res,
          checked: []
        })
      }
    });
  }

  return (
    <Loader
      loading={loading.effects.sysOrganization.downloadExcelStaff}
      tip="加载中..."
      style={{ width: "100%", height: '100%', flex: 1 }}
      bgColor="rgba(255, 255, 255, .7)"
    >
    <Fragment>
      <CardWrap noHover bordered={false}>
        <Row gutter={2}>
          <Col span="4">
            <FlexCol>
              <Menu className='nameMenu'>
              {/* <Menu.Item text="所有人员" active={-1 === companyId ? true : false}/> */}
                {companyList?.map((itm: any) => (
                  <div key={itm.id}>
                    <Menu.Item
                      text={itm.companyName}
                      active={itm.id === companyId ? true : false}
                      onClick={() => {
                        onButName(itm)
                      }}
                    />
                  </div>
                ))}
              </Menu>
            </FlexCol>
          </Col>
          <Col>
            <Card noHover bordered={false} className='rightCard'>
              <Search companyId={companyId}/>
              <Table companyId={companyId}/>
            </Card>
          </Col>
        </Row>
      </CardWrap>
      <Modals companyId={companyId}/>
      <EmployeeDetails />
    </Fragment>
    </Loader>
  )
}

export default Page;