import { Fragment, useEffect, useState } from 'react';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { Row, Col, Menu, Card } from 'uiw';
import { FlexCol } from './style';
import Search from './Search';
import Table from './Table';
import Modals from './Modals';

const Page = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    employeeInduction: { companyList },
  } = useSelector((state: RootState) => state);
  const [nameId, setNameId] = useState()

  useEffect(() => {
    if (companyList.length === 0) {
      dispatch.sysOrganization.selectList({
        callback: (data: any) => {
          setNameId(data[0].id)
          dispatch.sysOrganization.selectListStaff({id:data[0].id});
          dispatch.employeeInduction.updateState({
            companyList: data
          })
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyList])

  const onButName = (data: any) => {
    setNameId(data.id)
    dispatch.sysOrganization.selectListStaff({id:data.id});
  }

  return (
    <Fragment>
      <Row gutter={10}>
        <Col fixed style={{ width: 200, height: '100%' }}>
          <FlexCol>
            <Menu>
              {companyList.map((itm: any) => (
                <div key={itm.id}>
                  <Menu.Item
                    text={itm.companyName}
                    active={itm.id === nameId ? true : false}
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
          <Card noHover bordered={false}><Search /></Card>
          <div style={{ marginBottom: 10 }} />
          <Table />
        </Col>
      </Row>
      <Modals />
    </Fragment>
  )
}

export default Page;