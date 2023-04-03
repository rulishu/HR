import { Fragment } from 'react';
import { Divider } from 'uiw';
import Search from './Search';
import Table from './Table';
import Modals from './Modals'

const Page = () => {
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