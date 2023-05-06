import { Fragment } from 'react';
import EditModal from '../Modal/EditModal/index';
import ExamineModal from './EditModal/ExamineModal/index';
import Person from './EditModal/ExamineModal/Person';
import HrPerson from './EditModal/ExamineModal/HrPerson'

const Index = () => {
  return (
    <Fragment>
      <EditModal />
      <ExamineModal />
      <Person />
      <HrPerson/>
    </Fragment>
  );
};
export default Index;
