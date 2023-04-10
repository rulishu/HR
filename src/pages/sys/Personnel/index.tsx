import { Fragment, useEffect, useState } from 'react';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { Row, Col, Menu, Card, List } from 'uiw';
import { FlexCol, FlexTop, FlexSpan, CircleList, CircleCol, FlexIcon } from './style';
// import Search from './Search';
// import Table from './Table';
import Modals from './Modals';

const Page = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    employeeInduction: { companyList },
    sysOrganization: { dataListStaff },
  } = useSelector((state: RootState) => state);
  const [companyId, setCompanyId] = useState()
  const [userItem, setUserItem] = useState<any>()
  const [nameId, setNameId] = useState()


  useEffect(() => {
    if (companyList.length === 0) {
      dispatch.sysOrganization.selectList({
        callback: (data: any) => {
          setCompanyId(data?.[0].id)
          dispatch.sysOrganization.selectListStaff({
            id: data?.[0]?.id,
            callback: (res: any) => {
              setNameId(res?.staff?.[0]?.userId);
              setUserItem(res?.staff?.[0])
              dispatch.sysOrganization.updateState({
                dataListStaff: res?.staff
              })
            }
          });
          dispatch.employeeInduction.updateState({
            companyList: data
          })
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyList])

  const onButName = (data: any) => {
    setCompanyId(data.id)
    dispatch.sysOrganization.selectListStaff({ id: data.id });
  }

  return (
    <Fragment>
      <Card noHover bordered={false}>
        <Row gutter={10}>
          <Col span="5">
            <FlexCol>
              <Menu>
                {companyList.map((itm: any) => (
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
          <Col span="5">
            <FlexCol>
              <Menu>
                {dataListStaff.map((itm: any) => (
                  <div key={itm.userId}>
                    <Menu.Item
                      text={itm.staffName}
                      active={itm.userId === nameId ? true : false}
                      onClick={() => {
                        setUserItem(itm)
                      }}
                    />
                  </div>
                ))}
              </Menu>
            </FlexCol>
          </Col>
          <Col>
            <Card noHover bordered={false}>
              <FlexTop>
                <FlexIcon type="verification" />
                <FlexSpan>{userItem?.staffName}</FlexSpan>
              </FlexTop>
              <CircleList noHover size='large'>
                <List.Item>
                  <Row>
                    <CircleCol fixed>部门:</CircleCol>
                    <Col grow={1}> {userItem?.departmentName}</Col>
                  </Row>
                </List.Item>
                <List.Item>
                  <Row>
                    <CircleCol fixed>部门负责人:</CircleCol>
                    <Col grow={1}> {userItem?.departmentName}</Col>
                  </Row>
                </List.Item>
                <List.Item>
                  <Row>
                    <CircleCol fixed>项目组:</CircleCol>
                    <Col grow={1}> {userItem?.groupProjectName}</Col>
                  </Row>
                </List.Item>
                <List.Item>
                  <Row>
                    <CircleCol fixed>项目组负责人:</CircleCol>
                    <Col grow={1}> {userItem?.groupProjectName}</Col>
                  </Row>
                </List.Item>
                <List.Item>
                  <Row>
                    <CircleCol fixed>项目:</CircleCol>
                    <Col grow={1}> {userItem?.groupProjectName}</Col>
                  </Row>
                </List.Item>
                <List.Item>
                  <Row>
                    <CircleCol fixed>联系电话:</CircleCol>
                    <Col grow={1}>{userItem?.phone}</Col>
                  </Row>
                </List.Item>
                <List.Item>
                  <Row>
                    <CircleCol fixed>入场/离场时间:</CircleCol>
                    <Col grow={1}> {userItem?.createTime}</Col>
                  </Row>
                </List.Item>
                <List.Item>
                  <Row>
                    <CircleCol fixed>外派状态:</CircleCol>
                    <Col grow={1}> {userItem?.type === '1' ? "在职" : "离职"}</Col>
                  </Row>
                </List.Item>
              </CircleList>
            </Card>
            {/* <Card noHover bordered={false}><Search /></Card> */}
            {/* <div style={{ marginBottom: 10 }} /> */}
            {/* <Table /> */}
          </Col>
        </Row>
      </Card>
      <Modals />
    </Fragment>
  )
}

export default Page;