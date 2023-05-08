import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { Drawer, Button, Textarea } from 'uiw';
import { useEffect, useState } from 'react';

const ExamineModal = (props: any) => {
  const { table } = props;
  const dispatch = useDispatch<Dispatch>();
  const {
    interviewTasks: { examineVisible, vitaId },
    global: { userData },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch.sysRole.roleList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [value, setValue] = useState<string>('');

  // 取消
  const onClosed = () => {
    setValue('');
    dispatch.interviewTasks.update({
      examineVisible: false,
    });
  };

  /**
   * 不同意
   */
  const onNoAgree = () => {
    dispatch({
      type: 'interviewTasks/resumeInterview',
      payload: {
        id: vitaId,
        state: 2,
        context: value,
        flag: 1,
        type: 3,
        assignInterviewer: (userData as any)?.userId,
        interviewResult: '不同意',
        callback: () => {
          table?.onRefersh();
        },
      },
    });
  };

  /**
   * 同意
   */
  const onAgree = () => {
    dispatch({
      type: 'interviewTasks/resumeInterview',
      payload: {
        id: vitaId,
        state: 2,
        context: value,
        flag: 1,
        type: 3,
        assignInterviewer: (userData as any)?.userId,
        interviewResult: '同意',
        callback: () => {
          table?.onRefersh();
        },
      },
    });
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
        <div>
          <Button type="primary" onClick={() => onAgree()}>
            同意
          </Button>
          <Button onClick={() => onNoAgree()}>不同意</Button>
        </div>
      }
    >
      <div style={{ marginBottom: 10, marginTop: 10, fontWeight: 'bold' }}>面试反馈：</div>
      <Textarea
        value={value}
        placeholder="请输入内容"
        rows={6}
        style={{ paddingLeft: 10 }}
        onChange={(e) => onTextChange(e.target.value)}
      />
    </Drawer>
  );
};

export default ExamineModal;
