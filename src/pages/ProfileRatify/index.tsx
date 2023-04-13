import { Fragment, useEffect } from 'react';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { Row } from "uiw";
import U from './Users';
import C from './Content';
import M from './Modals';
import { CardWrap } from './style';

const Page = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    profileRatify: {
      companyList = [],
    },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (companyList.length === 0) {
      dispatch.sysOrganization.selectList({
        callback: (data: any) => {
          dispatch.profileRatify.updateState({
            companyList: data
          })
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyList]);

  useEffect(() => {
    dispatch.profileRatify.selectStaffFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Fragment>
      <CardWrap
        noHover
        bodyStyle={{ padding: 0, height: '100%', overflow: 'hidden' }}>
        <Row style={{ height: '100%' }}>
          <U />
          <C />
        </Row>
      </CardWrap>
      <M />
    </Fragment>
  )
}
export default Page;