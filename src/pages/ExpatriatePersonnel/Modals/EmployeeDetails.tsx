import { Dispatch, RootState, useDispatch, useSelector } from "@kkt/pro";
import { Row, Col, Modal, List, Steps } from 'uiw';
import { CircleList, CircleCol } from '../style/style';

function Modals() {
  const {
    sysOrganization: { visible, queryInfo, selectEntrance },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  //关闭弹窗
  const onClosed = () => {
    dispatch({
      type: "sysOrganization/updateState",
      payload: { visible: false },
    });
  };


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
            <Col grow={1}> {queryInfo?.post}</Col>
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
            <Col grow={1}> {queryInfo?.ProjectName}</Col>
          </Row>
        </List.Item>
        <List.Item>
          <Row>
            <CircleCol fixed>邮箱 :</CircleCol>
            <Col grow={1}> {queryInfo?.ProjectName}</Col>
          </Row>
        </List.Item>
        <List.Item>
          <Row>
            <CircleCol fixed>外派公司 :</CircleCol>
            <Col grow={1}> {queryInfo?.companyName}</Col>
          </Row>
        </List.Item>
        <List.Item>
          <Row>
            <CircleCol fixed>入场时间 :</CircleCol>
            <Col grow={1}> {queryInfo?.workAddress}</Col>
          </Row>
        </List.Item>
        <List.Item>
          <Row>
            <CircleCol fixed>离场时间 :</CircleCol>
            <Col grow={1}> {queryInfo?.groupProjectName}</Col>
          </Row>
        </List.Item>
        <List.Item>
          <Row>
            <CircleCol fixed>工作地址 :</CircleCol>
            <Col grow={1}> {queryInfo?.manager}</Col>
          </Row>
        </List.Item>

        <List.Item>
          <Row>
            <CircleCol fixed>办公方式 :</CircleCol>
            <Col grow={1}>{queryInfo?.phone}</Col>
          </Row>
        </List.Item>
        <List.Item>
          <Row justify="space-between">
            <CircleCol fixed>外派状态 :</CircleCol>
            <Col grow={1}> {queryInfo?.state === 1 ? "无" : queryInfo?.state === 3 ? "入场" : ''}</Col>
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
    </Modal>
  );
}

export default Modals;
