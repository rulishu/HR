import { Fragment, useEffect } from 'react';
import { useDispatch, Dispatch, useSelector, RootState, KktproKeys } from '@kkt/pro';
import Search from './Search';
import Table from './Table';
import Modals from './Modals'

const Page = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    global: { userData },
    usersModal: { roleList },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (userData) {
      dispatch.sysUser.usersList();
      if (roleList.length === 0) {
        dispatch.sysRole.roleList({
          pageSize: 1000,
          callback: (data: KktproKeys) => {
            dispatch.usersModal.updateState({
              roleList: data
            });
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])



  return (
    <Fragment>
      <Search />
      <div style={{ marginBottom: 20 }} />
      <Table />
      <Modals />
    </Fragment>
  )
}

export default Page;