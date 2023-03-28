import { Fragment } from 'react';
import { Divider } from 'uiw';
import Search from './Search';
import Table from './Table';

const Page = () => {
  return (
    <Fragment>
      <Search />
      <Divider />
      <Table />
    </Fragment>
  )
}

export default Page;