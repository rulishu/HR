import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { Drawer, Button, Textarea } from 'uiw';
import { useEffect, useState } from 'react';

const ExamineModal = () => {
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

  const onClosed = () => {
    setValue('');
    dispatch.interviewTasks.update({
      examineVisible: false,
    });
  };

  /**
   * 是否同意
   */
  const onAgree = () => {
    dispatch({
      type: 'interviewTasks/resumeInterview',
      payload: {
        id: vitaId,
        state: 4,
        context: value,
        flag: 1,
        type: 3,
        assignInterviewer: (userData as any)?.userId,
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
          <Button onClick={() => onClosed()}>不同意</Button>
        </div>
      }
    >
      <div style={{ marginBottom: 10, marginTop: 10, fontWeight: 'bold' }}>不通过原因：</div>
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
