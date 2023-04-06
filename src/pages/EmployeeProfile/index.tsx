import { Fragment, useEffect } from 'react';
import { useDispatch, Dispatch } from '@kkt/pro';
import { Divider } from 'uiw';
import Search from './Search';
import Table from './Table';
import Modals from './Modals'

const Page = () => {
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
      dispatch.employeeProfile.selectStaffFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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