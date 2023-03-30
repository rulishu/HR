import { Fragment, useEffect } from 'react';
import { useDispatch, Dispatch, useSelector, RootState, KktproKeys } from '@kkt/pro';
import { Divider } from 'uiw';
import Search from './Search';
import Table from './Table';

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
      <Divider />
      <Table />
    </Fragment>
  )
}

export default Page;