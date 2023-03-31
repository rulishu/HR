import { useSelector, RootState, useDispatch, Dispatch, KktproKeys } from '@kkt/pro';
import { Button, Table, Empty } from "uiw";
import { columns } from './utils';

const Page = () => {
  const {
    sysOrganization: { dataList }
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  // 新增
  const onModals = (type: 'add' | 'edit', data?: KktproKeys) => {
    dispatch.sysOrganizationModal.onModals({ type, data, isForm: true });
  }

  // 删除
  const onDelete = () => {}

  return (
    <div>
      <div style={{ marginBottom: 15 }}>
        <Button icon="plus" type="primary" onClick={() => onModals('add')}>
          新增
        </Button>
        <Button
          icon="delete"
          type="danger"
          onClick={() => {
            onDelete();
          }}
        >
          删除
        </Button>
      </div>
      <Table
        columns={columns({})}
        data={dataList}
        empty={<Empty />}
      />
    </div>
  )
}

export default Page;