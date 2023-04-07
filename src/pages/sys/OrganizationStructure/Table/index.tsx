import { Card, Button, Table, Empty, Pagination } from 'uiw';
import { columns } from './item'
import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';

const Index = () => {
  const {
    organizationStructure: { dataList, checked, page, pageSize, total }
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  // 新增
  const addModals = () => {
    dispatch({
      type: 'organizationStructure/update',
      payload: {
        editType: 'add',
        editVisible: true,
        formData: {}
      }
    })
  }
  // 翻页
  const onTurnPages = (current: any) => { }
  // 选择删除
  const onDelete = () => { }
  // 列表按钮
  const handle = (type: any, data: any) => {
    dispatch({
      type: 'organizationStructure/update',
      payload: {
        editType: type,
      }
    })
    if (type === 'edit') {
      dispatch({
        type: 'organizationStructure/update',
        payload: {
          editVisible: true
        }
      })
    }

  }
  return (
    <Card noHover={true}>
      <div style={{ marginBottom: 15 }}>
        <Button icon="plus" type="primary" onClick={() => addModals()}>
          发起审批
        </Button>
        <Button
          icon="delete"
          type="danger"
          onClick={() => {
            onDelete();
          }}
        >
          批量删除
        </Button>
      </div>
      <Table
        columns={columns(dispatch, dataList, checked, handle)}
        data={dataList}
        empty={<Empty />}
        footer={
          <Pagination
            current={page}
            pageSize={pageSize}
            total={total}
            divider
            onShowSizeChange={(current) => onTurnPages(current)}
          />
        }
      />
      {/* <Alert
        isOpen={false}
        confirmText="确定"
        cancelText="取消"
        icon="warning"
        type="warning"
        onClosed={() => onDelClosed()}
        onConfirm={() => onConfirm()}
        content="您确定要删除吗？"
      /> */}
    </Card>
  )
}
export default Index;