import { useSelector, RootState, useDispatch, Dispatch, KktproKeys } from '@kkt/pro';
import { Button, Table, Pagination, Empty, Alert } from "uiw";
import { columns } from './utils';

const Page = () => {
  const {
    sysRole: { dataList, page, pageSize, total, isDelete }
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  /**
   * 新增 / 编辑
   * 当前新增与页头新增同步
  */
  const roleModal = (type: 'add' | 'edit', data?: KktproKeys) => {
    dispatch.roleModal.onRoleAdd({ type, data, isForm: true });
  }

  // 删除
  const onRemove = (data: KktproKeys) => {
    // roleDelete
    dispatch.sysRole.updateState({
      detailsData: data,
      isDelete: true
    });
  }

  const onDelClosed = () => {
    dispatch.sysRole.hideModal();
  }

  const onConfirm = () => {
    dispatch.sysRole.roleDelete();
  }

  // 翻页
  const onTurnPages = (current: number) => {
    dispatch.sysRole.updateState({
      page: current
    });
    dispatch.sysRole.roleList();
  }

  return (
    <div>
      <div style={{ marginBottom: 15 }}>
        <Button icon="plus" type="primary" onClick={() => roleModal('add')}>
          新增
        </Button>
      </div>
      <Table
        key="id"
        columns={columns({
          onEdit: (data) => roleModal('edit', data),
          onRemove
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
    </div>
  )
}

export default Page;