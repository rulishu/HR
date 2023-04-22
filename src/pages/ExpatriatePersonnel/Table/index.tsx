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
    if (type) {
      dispatch({
        type: 'sysOrganization/updateState',
        payload: {
          isVisible: true,
          queryInfo: rowData,
        }
      })
    } else {
      dispatch({
        type: "sysOrganization/entranceOrDeparture",
        payload: {
        },
      });
    }
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