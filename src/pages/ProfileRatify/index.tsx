import { Fragment, useEffect } from 'react';
import { useDispatch, Dispatch, KktproKeys, useSelector, RootState } from '@kkt/pro';
import { Row } from "uiw";
import U from './Users';
import C from './Content';
import M from './Modals';
import { NoData } from '@/components';
import { CardWrap } from './style';

const Page = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    profileRatify: { noData }
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch.profileRatify.updateState({
      noData: false,
      list: [],
      page: 1
    })
    dispatch.profileRatify.selectStaffFile({
      callback: (data: KktproKeys[]) => {
        if (data.length > 0) {
          dispatch.profileRatify.getUserDetails({
            id: data[0].id
          })
          dispatch.profileRatify.updateState({
            checkId: data[0].id
          })
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Fragment>
      {noData ? (
        <NoData tip="暂无审核数据" />
      ) : (
        <CardWrap
          noHover
          bodyStyle={{ padding: 0, height: '100%', overflow: 'hidden' }}>
          <Row style={{ height: '100%' }}>
            <U />
            <C />
          </Row>
        </CardWrap>
      )}
      <M />
    </Fragment>
  )
}
export default Page;