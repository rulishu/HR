import { Fragment, useEffect, useState } from 'react';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { Row, Col, Menu, Card} from 'uiw';
import Modals from './Modals';
import EmployeeDetails from './Modals/EmployeeDetails'
import { FlexCol, CardWrap } from './style/style';
import './style/index.css';
import Search from './Search';
import Table from './Table';

const Page = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    employeeInduction: { companyList },
  } = useSelector((state: RootState) => state);
  const [companyId, setCompanyId] = useState()
  // const [userItem, setUserItem] = useState<any>()
  // const [nameId, setNameId] = useState()


  useEffect(() => {
    dispatch.sysOrganization.selectList({
      callback: (data: any) => {
        setCompanyId(data?.[0].id)
        dispatch.sysOrganization.selectListStaff({
          id: data?.[0]?.id,
          callback: (res: any) => {
            // setNameId(res?.[0]?.id);
            // setUserItem(res?.[0])
            dispatch.sysOrganization.updateState({
              dataListStaff: res
            })
            dispatch.sysOrganization.selectEntranceOrDeparture({ id: res?.[0]?.id, })
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
        // setNameId(res?.[0]?.id);
        // setUserItem(res?.[0])
        dispatch.sysOrganization.updateState({
          dataListStaff: res
        })
      }
    });
  }

  return (
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
                      // style={{lineHeight:'30px',fontSize:16}}
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
              <Search />
              <Table />
            </Card>
          </Col>
        </Row>
      </CardWrap>
      <Modals />
      <EmployeeDetails />
    </Fragment>
  )
}

export default Page;