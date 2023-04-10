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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
