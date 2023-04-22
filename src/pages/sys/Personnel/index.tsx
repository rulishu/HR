import { Fragment, useEffect, useState } from 'react';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { Row, Col, Menu, Card, List, Input, Button, Steps } from 'uiw';
import newDebounce from "@/utils/debounce";
import Modals from './Modals';
import { FlexCol, FlexTop, FlexSpan, CircleList, CircleCol, FlexIcon, FlexLeft, CardWrap } from './style/style';
import './style/index.css';
// import Search from './Search';
// import Table from './Table';

const Page = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    employeeInduction: { companyList },
    sysOrganization: { dataListStaff, selectEntrance },
  } = useSelector((state: RootState) => state);
  const [companyId, setCompanyId] = useState()
  const [userItem, setUserItem] = useState<any>()
  const [nameId, setNameId] = useState()


  useEffect(() => {
    dispatch.sysOrganization.selectList({
      callback: (data: any) => {
        setCompanyId(data?.[0].id)
        dispatch.sysOrganization.selectListStaff({
          id: data?.[0]?.id,
          callback: (res: any) => {
            setNameId(res?.[0]?.id);
            setUserItem(res?.[0])
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
        setNameId(res?.[0]?.id);
        setUserItem(res?.[0])
        dispatch.sysOrganization.updateState({
          dataListStaff: res
        })
      }
    });
  }

  const onModals = (type: number) => {
    if (type === 1) {
      dispatch({
        type: 'sysOrganization/updateState',
        payload: {
          isVisible: true,
          queryInfo: userItem,
        }
      })
    } else {
      dispatch({
        type: "sysOrganization/entranceOrDeparture",
        payload: {
          companyName: userItem?.companyName,
          staffId: userItem?.id,
          flag: 2
        },
      });
    }

  }

  const onVal = (e: any) => {
    dispatch.sysOrganization.selectListStaff({ id: companyId, staffName: e.target.value });
  };

  return (
    <Fragment>
      <CardWrap noHover bordered={false}>
        <Row gutter={2}>
          <Col span="5">
            <FlexCol>
              <Menu className='nameMenu'>
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
          <Col span="5">
            <FlexCol>
              <Input
                className='searchName'
                size='large'
                preIcon="search"
                placeholder="请输入内容"
                onChange={(e) => {
                  newDebounce(() => {
                    // 防抖
                    onVal(e);
                  }, 600)
                }}
              />
              <Menu className='nameMenu'>
                {dataListStaff?.map((itm: any) => (
                  <div key={itm.id}>
                    <Menu.Item
                      style={{ fontSize: 16, fontWeight: 500 }}
                      text={itm.staffName}
                      active={itm.id === nameId ? true : false}
                      onClick={() => {
                        setUserItem(itm)
                        setNameId(itm.id)
                      }}
                    />
                  </div>
                ))}
              </Menu>
            </FlexCol>
          </Col>
          <Col>
            <Card noHover bordered={false} className='rightCard'>
              <FlexTop>
                <FlexLeft>
                  <FlexIcon type="verification" />
                  <FlexSpan>{userItem?.staffName}</FlexSpan>
                </FlexLeft>
              </FlexTop>
              <CircleList noHover size='large'>
                <List.Item>
                  <Row>
                    <CircleCol fixed>外派公司 :</CircleCol>
                    <Col grow={1}> {userItem?.departmentName}</Col>
                  </Row>
                </List.Item>
                <List.Item>
                  <Row>
                    <CircleCol fixed>工作地址 :</CircleCol>
                    <Col grow={1}> {userItem?.leader}</Col>
                  </Row>
                </List.Item>
                <List.Item>
                  <Row>
                    <CircleCol fixed>工作形式 :</CircleCol>
                    <Col grow={1}> {userItem?.groupProjectName}</Col>
                  </Row>
                </List.Item>
                <List.Item>
                  <Row>
                    <CircleCol fixed>职位 :</CircleCol>
                    <Col grow={1}> {userItem?.manager}</Col>
                  </Row>
                </List.Item>
                <List.Item>
                  <Row>
                    <CircleCol fixed>身份证号 :</CircleCol>
                    <Col grow={1}> {userItem?.ProjectName}</Col>
                  </Row>
                </List.Item>
                <List.Item>
                  <Row>
                    <CircleCol fixed>联系电话 :</CircleCol>
                    <Col grow={1}>{userItem?.phone}</Col>
                  </Row>
                </List.Item>
                <List.Item>
                  <Row>
                    <CircleCol fixed>邮箱 :</CircleCol>
                    <Col grow={1}> {userItem?.ProjectName}</Col>
                  </Row>
                </List.Item>
                <List.Item>
                  <Row justify="space-between">
                    <CircleCol fixed>外派状态 :</CircleCol>
                    <Col grow={1}> {userItem?.state === 1 ? "无" : userItem?.state === 3 ? "入场" : ''}</Col>
                    <CircleCol fixed>
                      {userItem?.state === 3 ? <Button icon="edit" type="primary" onClick={() => onModals(3)} >离场</Button> : <Button icon="edit" type="primary" onClick={() => onModals(1)} >入场</Button>}
                    </CircleCol>
                  </Row>
                </List.Item>
                <List.Item>
                  <Row>
                    <CircleCol fixed>入场时间 :</CircleCol>
                    <Col grow={1}> {userItem?.createTime}</Col>
                  </Row>
                </List.Item>
                <List.Item>
                  <Row>
                    <CircleCol fixed>离场时间 :</CircleCol>
                    <Col grow={1}> {userItem?.createTime}</Col>
                  </Row>
                </List.Item>
                <List.Item>
                  <Row>
                    <CircleCol fixed>详细时间 :</CircleCol>
                    <Col grow={1}> <Steps direction="vertical" progressDot style={{ padding: '20px 0' }}>
                      {selectEntrance?.map((item: any) => <Steps.Step title={item.context} description={<div><div>入场时间：</div><div>离场时间：</div></div>} />)}
                    </Steps></Col>
                  </Row>
                </List.Item>
              </CircleList>
            </Card>
            {/* <Card noHover bordered={false}><Search /></Card> */}
            {/* <div style={{ marginBottom: 10 }} /> */}
            {/* <Table /> */}
          </Col>
        </Row>
      </CardWrap>
      <Modals />
    </Fragment>
  )
}

export default Page;