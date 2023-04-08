import { Fragment, useEffect } from 'react';
import { Card, Divider } from 'uiw';
import ButtonGroup from './ButtonGroup';
import Table from './Table';
import Modal from './Modal';
import { useDispatch, Dispatch } from '@kkt/pro';

const Index = () => {
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    dispatch.trainingDevelopment.selectList({
      enable: 1
    })
  }, [])
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
