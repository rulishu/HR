import { useDispatch, Dispatch, useSelector, RootState } from '@kkt/pro';
import { Button, Table, Empty, Alert, Card } from "uiw";
import { columns } from './utils';

const Page = () => {
  const {
    sysRoute: { dataList, isDelete },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  // 新增
  const addModal = () => {
    dispatch.sysRoute.updateState({
      isVisible: true,
      popUpStatus: 'add',
      detailsData: undefined,
    });
  }

  // 编辑
  const onEdit = (rowData: any) => {
    dispatch.sysRoute.updateState({
      isVisible: true,
      popUpStatus: 'edit',
      detailsData: rowData
    });
  }

  const onTableAdd = (rowData: any) => {
    dispatch.sysRoute.updateState({
      isVisible: true,
      popUpStatus: 'tableAdd',
      detailsData: {
        query: '2',
        parentId: rowData.menuId
      }
    });
  }

  // 删除
  const onRemove = (rowData: any) => {
    dispatch.sysRoute.updateState({
      detailsData: rowData,
      isDelete: true
    });
  }

  const onDelClosed = () => {
    dispatch.sysRoute.hideModal();
  }

  const onConfirm = () => {
    dispatch.sysRoute.deleteMenu();
  }

  return (
    <Card noHover>
      <div style={{ marginBottom: 15 }}>
        <Button icon="plus" type="primary" onClick={() => addModal()}>
          新增路由
        </Button>
      </div>
      <Table
        columns={columns({ onEdit, onRemove, onAdd: onTableAdd })}
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