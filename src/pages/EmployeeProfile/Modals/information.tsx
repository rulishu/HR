import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { Modal } from 'uiw';
import { formData, formDataVoid } from '@/pages/EmployeeInduction/utils'
import Form from './Form';
import Education from './Tables/Education'
import Work from './Tables/Work';
import Family from './Tables/Family';

const Information = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    global: { dictObject },
    employeeProfile: {
      isVisible
    },
  } = useSelector((state: RootState) => state);

  const datas = formData({
    dictObject,
    data: {}
  });

  //关闭弹窗
  const onClosed = () => {
    dispatch({
      type: "employeeProfile/updateState",
      payload: { isVisible: false },
    });
  };
  return (
    <Modal
      title="人员信息档案"
      minWidth={900}
      isOpen={isVisible}
      onClosed={() => onClosed()}
      type="danger"
      useButton={false}
      className="modalForm"
    >
      <div>
        {datas.map((item: formDataVoid, index: number) => {
          if (item.type) {
            return (
              <div key={index}>
                {item.type === 'education' && <Education />}
                {item.type === 'work' && <Work />}
                {item.type === 'family' && <Family />}
              </div>
            )
          }
          return (
            <Form
              key={index}
              title={item.title}
              formDatas={item.child || []}
              value={{}}
            />
          )
        })}
      </div>
    </Modal>
  )
}

export default Information;
