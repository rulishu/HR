import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';
import { Button, Table, Empty, Card } from "uiw";
import { columns } from './utils';

const Page = () => {
  const {
    sysOrganization: { dataListStaff },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  const onModals = (type: 'add' | 'edit', data?: any) => {
    dispatch({
      type: 'sysOrganization/updateState',
      payload: {
        isVisible: true,
      }
    })
  }

  // 删除
  const onDelete = (data: any) => {
    dispatch.sysItems.updateState({
      isDelete: true
    });
    dispatch.sysItemsModal.updateState({
      detailsData: data
    });
  }

  return (
    <Card noHover bordered={false}>
      <div style={{ marginBottom: 15 }}>
        <Button icon="swap" type="primary" onClick={() => onModals('add')}>
          同步人员信息
        </Button>
      </div>
      <Table
        columns={columns({
          onEdit: (data) => onModals('edit', data),
          onDelete,
        })}
        data={dataListStaff}
        empty={<Empty />}
      />
    </Card>
  )
}

export default Page;