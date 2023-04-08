import { Fragment, useEffect } from 'react';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { Row, Col } from 'uiw';
import Search from './Search';
import Table from './Table';
import Dict from './Table/Dict'
import Modals from './Modals';
import ModalsDict from './Modals/Dict';

const Page = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    global: { userData },
    sysDataDictionary: { dictData },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (userData) {
      dispatch.sysDataDictionary.selectList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])
  return (
    <Fragment>
      <Search />
      <div style={{ marginBottom: 20 }} />
      <Row gutter={20} style={{ margin: '0 -10px' }}>
        <Col span="14"><Table /></Col>
        <Col span="10">
          {dictData && <Dict />}
        </Col>
      </Row>
      <Modals />
      <ModalsDict />
    </Fragment>
  )
}

export default Page;