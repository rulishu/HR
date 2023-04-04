import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';
import { Button, Table, Empty, Alert, Card, Pagination } from "uiw";
import { columns } from './utils';

const Page = () => {
  const {
    sysDataDictionary: { dataList, isDelete },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  // 新增 / 编辑 / 新增部门 / 编辑部门
  const onModals = (type: 'add' | 'edit', data?: any) => {
    const _type = data && data.type === 'department' ? 'departmentEdit' : type;
    dispatch.sysDataDictionaryModal.onModals({ type: _type, data, isForm: true });
  }

  // 删除
  const onDelete = (data: any) => {
    dispatch.sysDataDictionary.updateState({
      isDelete: true
    });
    dispatch.sysDataDictionaryModal.updateState({
      detailsData: data
    });
  }

  const onDelClosed = () => {
    dispatch.sysDataDictionary.hideModal();
  }

  const onConfirm = () => {
    dispatch.sysDataDictionary.deletes();
  }

  const onTurnPages = (current: number) => {}

  return (
    <Card noHover={true}>
      <div style={{ marginBottom: 15 }}>
        <Button icon="plus" type="primary" onClick={() => onModals('add')}>
          新增
        </Button>
      </div>
      <Table
        columns={columns({
          onEdit: (data) => onModals('edit', data),
          onDelete
        })}
        data={dataList}
        empty={<Empty />}
        footer={(
          <Pagination
            current={1}
            pageSize={20}
            total={100}
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