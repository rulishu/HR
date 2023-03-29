import { Fragment, useEffect } from 'react';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import Table from './Table';
import Modal from './Modal';

const Page = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    global: { userData },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    userData && dispatch.sysRoute.selectMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

  return (
    <Fragment>
      <Table />
      <Modal />
    </Fragment>
  )
}

export default Page;