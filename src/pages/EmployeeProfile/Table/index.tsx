import { useSelector, RootState, useDispatch, Dispatch } from '@kkt/pro';
import { Button, Table, Pagination, Empty } from "uiw";
import { columns } from './utils';

const Page = () => {
  const {
    employeeProfile: { dataList, page, pageSize, total, }
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<Dispatch>();
  
  // 新增
  const addModal = () => {
    dispatch({
      type: 'employeeProfile/updateState',
      payload: {
        type: 'add',
        isVisible: true,
      },
    })
  }

  // 删除
  const onDelete = () => {}

  // 翻页
  const onTurnPages = (current: number) => {
    dispatch.employeeProfile.updateState({
      page: current
    });
    dispatch.employeeProfile.selectStaffFile();
  }

  return (
    <div>
      <div style={{ marginBottom: 15 }}>
        <Button icon="plus" type="primary" onClick={() => addModal()}>
          新增
        </Button>
        <Button
          icon="download"
          type="primary"
          onClick={() => {
            onDelete();
          }}
        >
          导出
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
    </div>
  )
}

export default Page;