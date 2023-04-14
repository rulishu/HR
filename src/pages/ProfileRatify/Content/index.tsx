import { useDispatch, Dispatch, useSelector, RootState, KktproKeys } from '@kkt/pro';
import { useRef, useState, useEffect } from 'react';
import { Button, Loader } from 'uiw';
import { Archives, ArchivesType } from '@/components';
import { ContentWrap, Title, ContentForms, BtnWrap } from '../style/content';
import { undefinedToString } from '@/utils';

const Content = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    loading,
    profileRatify: { allFormData }
  } = useSelector((state: RootState) => state);

  const archivesRef = useRef<ArchivesType>(null)

  const [data, setData] = useState<KktproKeys | undefined>(undefined);

  useEffect(() => {
    archivesRef.current?.reset();
    if (allFormData) {
      setData(undefinedToString(allFormData));
    }
  }, [allFormData])

  const onOpenModal = async (type: string) => {
    let values: any;
    if (type === 'isNoVisble') {
      values = await archivesRef.current?.getValues();
      console.log(555555, values)
    } else {
      values = await archivesRef.current?.submitvalidate();
    }
    dispatch.profileRatify.updateState({
      [type]: true,
      newFormData: values
    })
  }

  return (
    <Loader
      loading={loading.effects.profileRatify.getUserDetails}
      tip="加载中..."
      style={{ width: "100%", height: '100%', flex: 1 }}
      bgColor="rgba(255, 255, 255, .7)"
    >
      <ContentWrap>
        <Title>档案信息</Title>
        <ContentForms>
          <Archives
            ref={archivesRef}
            data={data}
          />
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
    </Loader>
  )
}

export default Content;