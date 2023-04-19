import { Fragment, useEffect, useState } from 'react';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { Row, Col, Menu, Card, List, Input, Button } from 'uiw';
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
    sysOrganization: { dataListStaff },
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

  const onModals = () => {
    dispatch({
      type: 'sysOrganization/updateState',
      payload: {
        isVisible: true,
        queryInfo: userItem,
      }
    })
  }

  const onVal = (e: any) => {
    dispatch.sysOrganization.selectListStaff({ id: companyId, staffName: e.target.value  });
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
                      style={{fontSize:16, fontWeight: 500}}
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
            <Card noHover bordered={false} style={{height: '100%', padding: 10}}>
              <FlexTop>
                <FlexLeft>
                <FlexIcon type="verification" />
                <FlexSpan>{userItem?.staffName}</FlexSpan>
                </FlexLeft>
                <Button icon="edit" type="primary" onClick={() => onModals()}/>
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
                    <Col grow={1}> {userItem?.leader}</Col>
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
                    <Col grow={1}> {userItem?.manager}</Col>
                  </Row>
                </List.Item>
                <List.Item>
                  <Row>
                    <CircleCol fixed>项目:</CircleCol>
                    <Col grow={1}> {userItem?.ProjectName}</Col>
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
                    <CircleCol fixed>外派状态:</CircleCol>
                    <Col grow={1}> {userItem?.state === 1 ? "无" : userItem?.state === 3 ? "入场" : ''}</Col>
                  </Row>
                </List.Item>
                <List.Item>
                  <Row>
                    <CircleCol fixed>{userItem?.state === '1' ? '离场时间' :  "入场时间"} :</CircleCol>
                    <Col grow={1}> {userItem?.createTime}</Col>
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