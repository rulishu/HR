import { useSelector, RootState, useDispatch, Dispatch, KktproKeys } from '@kkt/pro';
import { Button, Table, Pagination, Empty, Alert, Card } from "uiw";
import { columns } from './utils';

const Page = () => {
  const {
    sysUser: { dataList, page, pageSize, total, isDelete },
    usersModal: { roleList }
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  /**
   * 新增 / 编辑
   * 当前新增与页头新增同步
  */
  const usersModal = (type: 'add' | 'edit', data?: KktproKeys) => {
    dispatch.usersModal.onUsersAdd({ type, data, isForm: true });
  }

  // 删除
  const onDelete = (data: KktproKeys) => {
    // roleDelete
    dispatch.sysUser.updateState({
      detailsData: data,
      isDelete: true
    });
  }

  const onDelClosed = () => {
    dispatch.sysUser.hideModal();
  }

  const onConfirm = () => {
    dispatch.sysUser.usersDelete();
  }

  // 翻页
  const onTurnPages = (current: number) => {
    dispatch.sysUser.updateState({
      page: current
    });
    dispatch.sysUser.usersList();
  }

  return (
    <Card noHover>
      <div style={{ marginBottom: 15 }}>
        <Button icon="plus" type="primary" onClick={() => usersModal('add')}>
          新增
        </Button>
      </div>
      <Table
        key="id"
        columns={columns({
          onEdit: (data) => usersModal('edit', data),
          onDelete,
          roleList
        })}
        data={dataList}
        empty={<Empty />}
        footer={total > 0 && (
          <Pagination
            current={page}
            pageSize={pageSize}
            total={total}
            divider
            onChange={(current) => onTurnPages(current)}
          />
        )}
      />
      <Alert
        isOpen={isDelete}
        confirmText="确定"
        cancelText="取消"
        icon="warning"
        type="warning"
        onClosed={() => onDelClosed()}
        onConfirm={() => onConfirm()}
        content="您确定要删除吗？"
      />
    </Card>
  )
}

export default Page;