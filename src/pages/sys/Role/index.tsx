import { Fragment, useEffect } from 'react';
import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { Divider } from 'uiw';
import Search from './Search';
import Table from './Table';

const Page = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    global: { userData },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    userData && dispatch.sysRole.roleList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

  return (
    <Fragment>
      <Search />
      <Divider />
      <Table />
    </Fragment>
  )
}

export default Page;