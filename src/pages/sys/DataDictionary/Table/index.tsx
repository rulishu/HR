import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';
import { Button, Table, Empty, Alert, Card, Pagination } from "uiw";
import { columns } from './utils';

const Page = () => {
  const {
    sysDataDictionary: { dataList, isDelete, isDictDelect, page, pageSize, total },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  // 新增 / 编辑
  const onModals = (type: 'add' | 'edit', data?: any) => {
    dispatch.sysDataDictionaryModal.onModals({ type, data, isForm: true });
  }

  // 删除
  const onDelete = (data: any) => {
    dispatch.sysDataDictionary.updateState({
      isDelete: true,
      isDictDelect: false,
    });
    dispatch.sysDataDictionaryModal.updateState({
      detailsData: data
    });
  }

  /**
   * 查看字典数据
  */
  const onShow = (data: any) => {
    dispatch.sysDataDictionary.updateState({
      dictData: data,
      dictDataList: data.dictData || []
    });
  }

  const onDelClosed = () => {
    dispatch.sysDataDictionary.hideModal();
  }

  const onConfirm = () => {
    if (isDictDelect) {
      dispatch.sysDataDictionary.dictDeletes();
    } else {
      dispatch.sysDataDictionary.deletes();
    }
  }

  const onTurnPages = (current: number) => {
    dispatch.sysUser.updateState({
      page: current
    });
    dispatch.sysDataDictionary.selectList();
  }

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
          onDelete,
          onShow
        })}
        data={dataList}
        empty={<Empty />}
        footer={(
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