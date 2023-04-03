import { Fragment, useEffect } from 'react';
import { useDispatch, Dispatch, useSelector, RootState, KktproKeys } from '@kkt/pro';
import { Divider } from 'uiw';
import Search from './Search';
import Table from './Table';
import Modals from './Modals';

const Page = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    global: { userData },
    sysItemsModal: { companyList = [] },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (userData) {
      dispatch.sysItems.selectList();
      if (companyList.length === 0) {
        dispatch.sysOrganization.selectList({
          callback: (data: KktproKeys) => {
            dispatch.sysItemsModal.updateState({
              companyList: data
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
      <Modals />
    </Fragment>
  )
}

export default Page;