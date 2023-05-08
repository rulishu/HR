import { Fragment } from 'react';
import ExamineModal from './ExamineModal/index';

const Index = (props: any) => {
  const { table } = props;

  return (
    <Fragment>
      <ExamineModal table={table} />
    </Fragment>
  );
};
export default Index;
