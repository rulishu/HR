import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { Card, Button } from 'uiw';
import { formData, formDataVoid } from '@/pages/EmployeeInduction/utils'
import Form from './Form';
import Education from './Tables/Education'
import Work from './Tables/Work';
import Family from './Tables/Family';
import { ContentWrap, Title, ContentForms, BtnWrap } from '../style/content';

const Content = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    global: { dictObject },
  } = useSelector((state: RootState) => state);

  const datas = formData({
    dictObject,
    data: {}
  });

  const onOpenModal = (type: string) => {
    dispatch.profileRatify.updateState({
      [type]: true
    })
  }

  return (
    <ContentWrap>
      <Title>档案信息</Title>
      <ContentForms>
        {datas.map((item: formDataVoid, index: number) => {
          if (item.type) {
            return (
              <Card key={index} noHover title={item.title}>
                {item.type === 'education' && <Education />}
                {item.type === 'work' && <Work />}
                {item.type === 'family' && <Family />}
              </Card>
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
      </ContentForms>
      <BtnWrap>
        <Button
          type="primary"
          className="form-btn"
          onClick={() => onOpenModal('isOkVisble')}
        >审批通过</Button>
        <Button
          className="form-btn"
          onClick={() => onOpenModal('isNoVisble')}
        >审批不通过</Button>
      </BtnWrap>
    </ContentWrap>
  )
}

export default Content;