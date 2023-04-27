import { Dispatch, RootState, useDispatch, useSelector } from "@kkt/pro";
import { Row, Col, Modal, List, Steps, Tag } from 'uiw';
import { CircleList, CircleCol } from '../style/style';

function Modals() {
  const {
    sysOrganization: { visible, queryInfo, selectEntrance },
    global: { dictObject },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  //关闭弹窗
  const onClosed = () => {
    dispatch({
      type: "sysOrganization/updateState",
      payload: { visible: false },
    });
  };
  const post = dictObject['post']?.child.filter((item: any) => item.value === queryInfo?.post)?.[0]
  
  return (
    <Modal
      title='员工详情'
      width={900}
      isOpen={visible}
      onClosed={() => onClosed()}
      type="danger"
      useButton={false}
      className="modalForm"
    >
      <CircleList noHover size='small'>
        <List.Item>
          <Row>
            <CircleCol fixed>姓名 :</CircleCol>
            <Col grow={1}> {queryInfo?.staffName}</Col>
          </Row>
        </List.Item>
        <List.Item>
          <Row>
            <CircleCol fixed>职位 :</CircleCol>
            <Col grow={1}> {post?.label}
            </Col>
          </Row>
        </List.Item>
        <List.Item>
          <Row>
            <CircleCol fixed>联系方式 :</CircleCol>
            <Col grow={1}> {queryInfo?.phone}</Col>
          </Row>
        </List.Item>
        <List.Item>
          <Row>
            <CircleCol fixed>身份证号 :</CircleCol>
            <Col grow={1}> {queryInfo?.idNumber}</Col>
          </Row>
        </List.Item>
        <List.Item>
          <Row>
            <CircleCol fixed>邮箱 :</CircleCol>
            <Col grow={1}> {queryInfo?.email}</Col>
          </Row>
        </List.Item>
        <List.Item>
          <Row>
            <CircleCol fixed>外派公司 :</CircleCol>
            <Col grow={1}> {queryInfo?.expatriateCompanyName}</Col>
          </Row>
        </List.Item>
        <List.Item>
          <Row>
            <CircleCol fixed>入场时间 :</CircleCol>
            <Col grow={1}> {queryInfo?.entranceTime}</Col>
          </Row>
        </List.Item>
        <List.Item>
          <Row>
            <CircleCol fixed>离场时间 :</CircleCol>
            <Col grow={1}> {queryInfo?.departureTime}</Col>
          </Row>
        </List.Item>
        <List.Item>
          <Row>
            <CircleCol fixed>工作地址 :</CircleCol>
            <Col grow={1}> {queryInfo?.workAddress}</Col>
          </Row>
        </List.Item>
        <List.Item>
          <Row>
            <CircleCol fixed>办公方式 :</CircleCol>
            <Col grow={1}>{queryInfo?.workWay}</Col>
          </Row>
        </List.Item>
        <List.Item>
          <Row justify="space-between">
            <CircleCol fixed>外派状态 :</CircleCol>
            <Col grow={1}><Tag light title={queryInfo?.state === 3 ? '外派中' : '未外派'} color={queryInfo?.state === 3 ? '#28a745' : '#008EF0'} /></Col>
          </Row>
        </List.Item>
        <List.Item>
          <Row>
            <CircleCol fixed>备注 :</CircleCol>
            <Col grow={1}>{queryInfo?.remake}</Col>
          </Row>
        </List.Item>
        <List.Item>
          <Row>
            <CircleCol fixed>详细时间 :</CircleCol>
            <Col grow={1}> <Steps direction="vertical" progressDot style={{ padding: '20px 0' }}>
              {selectEntrance?.map((item: any) => <Steps.Step key={item.createTime} title={item.context} description={<><div>入场时间：{item.createTime}</div><div>离场时间：{item.updateTime}</div></>} />)}
            </Steps></Col>
          </Row>
        </List.Item>
      </CircleList>
    </Modal>
  );
}

export default Modals;
