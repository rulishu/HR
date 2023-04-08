import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';
import { Button, Table, Pagination, Empty } from "uiw";
import { columns } from './utils';

const Page = () => {
  const {
    sysItems: { dataList },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();

  // 新增 / 编辑
  const onModals = (type: 'add' | 'edit', data?: any) => {
    dispatch({
      type: 'employeeDepart/updateState',
      payload: {
        type: 'add',
        isVisible: true,
      }
    })
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
  // 翻页
  const onTurnPages = (current: number) => {}

  return (
    <div>
      <div style={{ marginBottom: 15 }}>
        <Button icon="download" type="primary">
          导出
        </Button>
      </div>
      <Table
        columns={columns({
          onEdit: (data) => onModals('edit', data),
          onDelete,
        })}
        data={dataList}
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