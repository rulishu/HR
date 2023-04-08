import { Fragment } from 'react';
import { Card, Divider } from 'uiw';
import ButtonGroup from './ButtonGroup';
import Table from './Table'

const Index = () => {
  return (
    <Fragment>
      <Card noHover>
        <ButtonGroup />
        <Divider />
        <Table />
      </Card>
    </Fragment>
  )
}
export default Index;
