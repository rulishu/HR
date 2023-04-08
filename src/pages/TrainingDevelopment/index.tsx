import { Fragment } from 'react';
import { Card, Divider } from 'uiw';
import ButtonGroup from './ButtonGroup';
import Table from './Table';
import Modal from './Modal'

const Index = () => {
  return (
    <Fragment>
      <Card noHover>
        <ButtonGroup />
        <Divider />
        <Table />
      </Card>
      <Modal />
    </Fragment>
  )
}
export default Index;
