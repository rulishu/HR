import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { Drawer, Steps, Button, Card, Textarea } from 'uiw';
import '../../../style/index.css';
import { useEffect, useState } from 'react';

const ExamineModal = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    resume: {
      examineVisible,
      hrPersonDate,
      itPersonDate,
      vitaId,
      assignHrName,
      assignInterviewerName,
      assignState,
      itContext,
      hrContext,
      itState,
      hrState,
      page,
      pageSize,
    },
    usersModal: { roleList },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch.sysRole.roleList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [value, setValue] = useState<string>(hrContext);

  // 取消
  const onClosed = () => {
    setValue('');
    dispatch.resume.update({
      examineVisible: false,
    });
    dispatch.resume.quickSelect({ page: page, pageSize: pageSize });
  };

  //  获取 hr 角色
  const hr = roleList
    .filter((a: any) => {
      return a && a.desc === 'hr-leader';
    })
    .map((a: any) => a?.id);

  //  获取 技术人员 角色
  const it = roleList
    .filter((a: any) => {
      return (a && a.desc === 'general') || (a && a.desc === 'entry');
    })
    .map((a: any) => a?.id);

  const dispatchFn = (params: any) => {
    dispatch({
      type: 'resume/update',
      payload: params,
    });
  };

  // 选择技术面
  const onSkill = async () => {
    await dispatch({
      type: 'resume/selectListByRole',
      payload: {
        ids: it,
        personType: 'it',
      },
    });
    await dispatchFn({ isPersonVisible: true, personType: 'it' });
  };

  // 选择hr面
  const onHr = async () => {
    await dispatch({
      type: 'resume/selectListByRole',
      payload: {
        ids: hr,
        personType: 'hr',
      },
    });
    await dispatchFn({ isHrPersonVisible: true, personType: 'hr' });
  };

  /**
   * 同意
   */
  const onAgree = async () => {
    await dispatch({
      type: 'resume/resumeInterview',
      payload: {
        id: vitaId,
        state: 3,
        context: value,
        flag: 1,
        type: 4,
        interviewResult: '同意',
      },
    });
    await dispatch.resume.quickSelect({ page: page, pageSize: pageSize });
  };

  /**
   * 不同意
   */
  const onNoAgree = async () => {
    await dispatch({
      type: 'resume/resumeInterview',
      payload: {
        id: vitaId,
        state: 3,
        context: value,
        flag: 1,
        type: 4,
        interviewResult: '不同意',
      },
    });
    await dispatch.resume.quickSelect({ page: page, pageSize: pageSize });
  };
  // 反馈
  const onTextChange = (val: string) => {
    setValue(val);
  };

  return (
    <Drawer
      size={700}
      title="审批"
      isOpen={examineVisible}
      type="primary"
      onClose={() => onClosed()}
      footer={
        itState === '不同意' ? (
          ''
        ) : (
          <div>
            <Button type="primary" onClick={() => onAgree()}>
              同意
            </Button>
            <Button onClick={() => onNoAgree()}>不同意</Button>
          </div>
        )
      }
    >
      <Card>
        <Steps direction="vertical" progressDot style={{ padding: '20px 0' }}>
          <Steps.Step
            description={
              <div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <div style={{ width: 400, fontWeight: 'bold', color: '#000' }}>技术面试</div>
                  <div style={{ width: 200, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <div style={{ marginRight: 8 }}>{itPersonDate?.at(0) || assignInterviewerName}</div>
                    <Button
                      disabled={itState === '不同意' || itState === '同意'}
                      onClick={() => {
                        onSkill();
                      }}
                    >
                      选择
                    </Button>
                  </div>
                </div>
                <div style={{ marginBottom: 6 }}>状态：{itState}</div>
                <div style={{ marginBottom: 6 }}>反馈：{itContext}</div>
              </div>
            }
          />
          <Steps.Step
            description={
              <div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <div style={{ width: 400, fontWeight: 'bold', color: '#000' }}>人事面试</div>
                  <div style={{ width: 200, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <div style={{ marginRight: 8 }}>{hrPersonDate?.at(0) || assignHrName}</div>
                    <Button
                      disabled={hrState === '不同意' || hrState === '同意'}
                      onClick={() => {
                        onHr();
                      }}
                    >
                      选择
                    </Button>
                  </div>
                </div>
                <div style={{ marginBottom: 6 }}>状态：{hrState}</div>
                <div style={{ marginBottom: 6 }}>反馈：{hrContext}</div>
              </div>
            }
          />
        </Steps>
      </Card>
      <div style={{ marginBottom: 10, marginTop: 10, fontWeight: 'bold' }}>面试反馈：</div>
      <Textarea
        value={hrContext || value}
        disabled={assignState === 3 || assignState === 4}
        placeholder="请输入内容"
        rows={6}
        style={{ paddingLeft: 10 }}
        onChange={(e) => onTextChange(e.target.value)}
      />
    </Drawer>
  );
};

export default ExamineModal;
