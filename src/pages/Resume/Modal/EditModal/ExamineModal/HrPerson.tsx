import { useDispatch, Dispatch, useSelector, RootState, KktproKeys } from '@kkt/pro';
import { Modal, SearchSelect, Button } from 'uiw';
import React from 'react';

const HrPerson = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    resume: { isHrPersonVisible, hrInterviewer, personType, vitaId },
  } = useSelector((state: RootState) => state);

  const selectOption = hrInterviewer.map((item: KktproKeys) => ({ label: item?.name, value: Number(item?.userId) }));
  const [values, setValues] = React.useState([]);
  const [option, setOption] = React.useState(selectOption);
  const [loading, setLoading] = React.useState(false);

  function handleSearch(e: any) {
    setLoading(true);
    setTimeout(() => {
      const filterOpion = selectOption.filter((item) => !!item.label.includes(e.trim()));
      setOption([...filterOpion]);
      setLoading(false);
    }, 100);
  }

  const onClosed = () => {
    setValues([]);
    dispatch.resume.update({
      isHrPersonVisible: false,
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
    if (personType === 'hr') {
      dispatch.resume.update({
        hrPersonDate: [userName, values],
        isHrPersonVisible: false,
      });
      dispatch.resume.interviewAssignment({
        assignHr: values,
        state: 2,
        id: vitaId,
      });
    }
  };

  return (
    <Modal
      minWidth={500}
      title="审批人"
      isOpen={isHrPersonVisible}
      maskClosable={false}
      useButton={false}
      confirmText="提交"
      cancelText="取消"
      type="primary"
      onClosed={onClosed}
    >
      <div style={{ marginBottom: 10, fontWeight: 'bold' }}>人事面试：</div>
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

export default HrPerson;
