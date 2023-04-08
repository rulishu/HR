import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';
import { Button, Table, Empty, Alert, Card } from "uiw";
import { columns } from './utils';

const Page = () => {
  const {
    sysOrganization: { dataList, isDelete },
    sysOrganizationModal: { detailsData }
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  // 新增 / 编辑 / 新增部门 / 编辑部门
  const onModals = (type: 'add' | 'edit' | 'departmentAdd' | 'departmentEdit', data?: any) => {
    const _type = data && data.type === 'department' ? 'departmentEdit' : type;
    dispatch.sysOrganizationModal.onModals({ type: _type, data, isForm: true });
  }

  const onAddDepartment = (data: any) => {
    dispatch.sysOrganizationModal.onModals({
      type: 'departmentAdd',
      data: {
        id: data.id,
        companyName: data.companyName
      },
      isForm: true
    });
  }

  // 删除
  const onDelete = (data: any) => {
    dispatch.sysOrganization.updateState({
      isDelete: true
    });
    dispatch.sysOrganizationModal.updateState({
      detailsData: data
    });
  }

  const onDelClosed = () => {
    dispatch.sysOrganization.hideModal();
  }

  const onConfirm = () => {
    if ((detailsData as any).type === 'department') {
      dispatch.sysOrganization.departmentDelete();
    } else {
      dispatch.sysOrganization.deletes();
    }
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
          onAddDepartment,
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