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
    global: { userData },
    sysOrganization: { dataList },
  } = useSelector((state: RootState) => state);
  const [nameId, setNameId] = useState(1)

  useEffect(() => {
    if (userData) {
      dispatch.sysOrganization.selectList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

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
              {dataList.map((itm: any) => (
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