import { Fragment } from 'react';
import { Card } from 'uiw';
import Search from './Search';
import Table from './Table';

const Page = () => {
  return (
    <Fragment>
      <Card noHover bordered={false} style={{ marginBottom: 14 }}><Search /></Card>
      <Card noHover bordered={false}><Table /></Card>
    </Fragment>
  )
}

export default Page;