import { useDispatch, Dispatch, useSelector, RootState, KktproKeys } from '@kkt/pro';
import { Modal, SearchSelect, Button } from 'uiw';
import React from 'react';

const Person = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    resume: { isPersonVisible, interviewer, personType, vitaId },
  } = useSelector((state: RootState) => state);

  const selectOption = interviewer.map((item: KktproKeys) => ({ label: item?.name, value: Number(item?.userId) }));
  const [values, setValues] = React.useState([]);
  const [option, setOption] = React.useState(selectOption);
  const [loading, setLoading] = React.useState(false);

  function handleSearch(e: any) {
    setLoading(true);
    const filterOpion = selectOption.filter((item) => !!item.label.includes(e.trim()));
    setOption([...filterOpion]);
    setLoading(false);
  }

  const onClosed = () => {
    setValues([]);
    dispatch.resume.update({
      isPersonVisible: false,
    });
  };

  /**
   * 提交
   */
  const onConfirm = () => {
    const userName = option
      ?.filter((item: any) => {
        return item.value === values;
      })
      .map((a) => a.label)
      .toString();
    if (personType === 'it') {
      dispatch.resume.update({
        itPersonDate: [userName, values],
        isPersonVisible: false,
      });
      dispatch.resume.interviewAssignment({
        assignInterviewer: values,
        state: 1,
        id: vitaId,
      });
    }
  };

  return (
    <Modal
      minWidth={500}
      title="审批人"
      isOpen={isPersonVisible}
      maskClosable={false}
      useButton={false}
      confirmText="提交"
      cancelText="取消"
      type="primary"
      onClosed={onClosed}
    >
      <div style={{ marginBottom: 10, fontWeight: 'bold' }}>技术面试人：</div>
      <SearchSelect
        mode="single"
        showSearch={true}
        value={values}
        option={option}
        loading={loading}
        onSearch={handleSearch}
        placeholder="请选择选项"
        style={{ width: 200 }}
        onChange={(values: any) => {
          setValues(values);
        }}
      />
      <div className="w-modal-footer" style={{ margin: 0, marginTop: 30 }}>
        <Button type="primary" onClick={onConfirm}>
          确定
        </Button>
        <Button onClick={onClosed}>取消</Button>
      </div>
    </Modal>
  );
};

export default Person;
