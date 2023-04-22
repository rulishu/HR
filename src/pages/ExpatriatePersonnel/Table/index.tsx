import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';
import { Button, Table, Empty, Card } from "uiw";
import { columns } from './utils';

const Page = () => {
  const {
    sysOrganization: { dataListStaff },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  const onEdit = (rowData?: any, type?: number) => {
    //入场
    const typeVisible = type ? 'isVisible' : 'visible'
    dispatch({
      type: 'sysOrganization/updateState',
      payload: {
        [typeVisible]: true,
        queryInfo: rowData,
      }
    })
  }

  return (
    <Card noHover bordered={false}>
      <div style={{ marginBottom: 15 }}>
        <Button icon="download" type="primary">
          导出
        </Button>
      </div>
      <Table
        columns={columns({
          onEdit,
        })}
        data={dataListStaff}
        empty={<Empty />}
      />
    </Card>
  )
}

export default Page;