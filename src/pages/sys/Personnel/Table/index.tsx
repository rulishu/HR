import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';
import { Button, Table, Empty, Alert, Card } from "uiw";
import { columns } from './utils';

const Page = () => {
  const {
    sysItems: { dataList, isDelete },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  // 新增 / 编辑
  const onModals = (type: 'add' | 'edit', data?: any) => {
    dispatch.sysItemsModal.onModals({ type, data, isForm: true });
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

  const onDelClosed = () => {
    dispatch.sysItems.hideModal();
  }

  const onConfirm = () => {
    dispatch.sysItems.deletes();
  }

  return (
    <Card noHover bordered={false}>
      <div style={{ marginBottom: 15 }}>
        <Button icon="plus" type="primary" onClick={() => onModals('add')}>
          新增
        </Button>
      </div>
      <Table
        columns={columns({
          onEdit: (data) => onModals('edit', data),
          onDelete,
        })}
        data={dataList}
        empty={<Empty />}
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