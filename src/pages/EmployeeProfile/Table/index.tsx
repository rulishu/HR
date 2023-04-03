import { useDispatch, Dispatch, KktproKeys } from '@kkt/pro';
import { Button, Table, Pagination, Empty } from "uiw";
import { columns } from './utils';

const Page = () => {
  const dispatch = useDispatch<Dispatch>();
  // 新增
  const usersModal = (type: 'add' | 'edit', data?: KktproKeys) => {
    dispatch.usersModal.onUsersAdd({ type, data, isForm: true });
  }

  // 删除
  const onDelete = () => {}

  // 翻页
  const onTurnPages = (current: number) => {}

  return (
    <div>
      <div style={{ marginBottom: 15 }}>
        <Button icon="plus" type="primary" onClick={() => usersModal('add')}>
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
        data={[]}
        empty={<Empty />}
        footer={
          <Pagination
            current={1}
            pageSize={20}
            total={100}
            divider
            onChange={(current) => onTurnPages(current)}
          />
        }
      />
    </div>
  )
}

export default Page;